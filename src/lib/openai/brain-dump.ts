import { openai } from "./client";
import { BRAIN_DUMP_SYSTEM_PROMPT } from "./prompts";

export async function analyzeBrainDump(rawText: string, imageUrls?: string[]) {
  const messages: Parameters<typeof openai.chat.completions.create>[0]["messages"] = [
    { role: "system", content: BRAIN_DUMP_SYSTEM_PROMPT },
  ];

  if (imageUrls && imageUrls.length > 0) {
    messages.push({
      role: "user",
      content: [
        { type: "text", text: `Here is my product idea:\n\n${rawText}` },
        ...imageUrls.map((url) => ({
          type: "image_url" as const,
          image_url: { url },
        })),
      ],
    });
  } else {
    messages.push({
      role: "user",
      content: `Here is my product idea:\n\n${rawText}`,
    });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 1500,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from AI");

  return JSON.parse(content);
}
