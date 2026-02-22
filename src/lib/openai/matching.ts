import { openai } from "./client";
import { MATCHING_SYSTEM_PROMPT } from "./prompts";
import type { ProductBrief, Manufacturer } from "@/lib/types";

export async function matchManufacturers(
  brief: ProductBrief,
  manufacturers: Manufacturer[]
) {
  const briefContext = JSON.stringify(
    {
      title: brief.title,
      category: brief.category,
      description: brief.description,
      specifications: brief.specifications,
      estimated_unit_cost_min: brief.estimated_unit_cost_min,
      estimated_unit_cost_max: brief.estimated_unit_cost_max,
      estimated_moq: brief.estimated_moq,
    },
    null,
    2
  );

  const manufacturersList = JSON.stringify(
    manufacturers.map((m) => ({
      manufacturer_id: m.id,
      business_name: m.business_name,
      categories: m.categories,
      specialties: m.specialties,
      certifications: m.certifications,
      moq_min: m.moq_min,
      moq_max: m.moq_max,
      lead_time_days_min: m.lead_time_days_min,
      lead_time_days_max: m.lead_time_days_max,
      composite_rating: m.composite_rating,
      total_reviews: m.total_reviews,
      verification_status: m.verification_status,
    })),
    null,
    2
  );

  const systemPrompt = MATCHING_SYSTEM_PROMPT
    .replace("{briefContext}", briefContext)
    .replace("{manufacturersList}", manufacturersList);

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: "Find the best manufacturer matches for this product brief." },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
    max_tokens: 2000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from AI");

  const parsed = JSON.parse(content);
  // OpenAI may return an array directly, or wrap it in an object
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed.matches)) return parsed.matches;
  if (Array.isArray(parsed.results)) return parsed.results;
  return [];
}
