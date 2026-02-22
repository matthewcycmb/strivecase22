import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { streamRefinement, extractBriefUpdates } from "@/lib/openai/refine";
import type { ProductBrief, ChatMessage } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { briefId, message } = await request.json();

    const { data: brief, error } = await supabase
      .from("product_briefs")
      .select("*")
      .eq("id", briefId)
      .single();

    if (error || !brief) {
      return new Response("Brief not found", { status: 404 });
    }

    const chatHistory = (brief.chat_history || []) as ChatMessage[];

    const encoder = new TextEncoder();
    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamRefinement(
            brief as ProductBrief,
            chatHistory,
            message
          )) {
            fullResponse += chunk;
            controller.enqueue(encoder.encode(chunk));
          }

          // After streaming completes, update brief
          const updatedHistory: ChatMessage[] = [
            ...chatHistory,
            { role: "user", content: message, timestamp: new Date().toISOString() },
            { role: "assistant", content: fullResponse, timestamp: new Date().toISOString() },
          ];

          const briefUpdates = extractBriefUpdates(fullResponse);
          const updateData: Record<string, unknown> = {
            chat_history: updatedHistory,
            status: "refining",
            updated_at: new Date().toISOString(),
          };

          if (briefUpdates) {
            if (briefUpdates.specifications) {
              updateData.specifications = {
                ...(brief.specifications as Record<string, unknown>),
                ...(briefUpdates.specifications as Record<string, unknown>),
              };
              delete briefUpdates.specifications;
            }
            Object.assign(updateData, briefUpdates);
          }

          await supabase
            .from("product_briefs")
            .update(updateData)
            .eq("id", briefId);

          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Refinement error:", error);
    return new Response("Failed to process refinement", { status: 500 });
  }
}
