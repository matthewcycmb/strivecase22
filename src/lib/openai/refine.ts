import { openai } from "./client";
import { REFINEMENT_SYSTEM_PROMPT } from "./prompts";
import type { ProductBrief, ChatMessage } from "@/lib/types";

export async function* streamRefinement(
  brief: ProductBrief,
  chatHistory: ChatMessage[],
  userMessage: string
) {
  const briefContext = JSON.stringify(
    {
      title: brief.title,
      category: brief.category,
      description: brief.description,
      target_audience: brief.target_audience,
      specifications: brief.specifications,
      estimated_unit_cost_min: brief.estimated_unit_cost_min,
      estimated_unit_cost_max: brief.estimated_unit_cost_max,
      estimated_moq: brief.estimated_moq,
    },
    null,
    2
  );

  const systemPrompt = REFINEMENT_SYSTEM_PROMPT.replace("{briefContext}", briefContext);

  const messages: Parameters<typeof openai.chat.completions.create>[0]["messages"] = [
    { role: "system", content: systemPrompt },
    ...chatHistory.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
    { role: "user", content: userMessage },
  ];

  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    stream: true,
    temperature: 0.7,
    max_tokens: 800,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}

export function extractBriefUpdates(fullResponse: string): Record<string, unknown> | null {
  const match = fullResponse.match(/<brief_update>([\s\S]*?)<\/brief_update>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}
