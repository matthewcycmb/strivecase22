import { openai } from "./client";

export async function generateMockup(analysis: {
  title: string;
  category: string;
  description: string;
  specifications?: {
    materials?: string[];
    colors?: string[];
    finish?: string;
  };
}): Promise<string | null> {
  try {
    const prompt = `Product mockup photograph on a clean white studio background. Product: ${analysis.title}. ${analysis.description}. ${
      analysis.specifications?.materials?.length
        ? `Materials: ${analysis.specifications.materials.join(", ")}.`
        : ""
    } ${
      analysis.specifications?.colors?.length
        ? `Colors: ${analysis.specifications.colors.join(", ")}.`
        : ""
    } ${
      analysis.specifications?.finish
        ? `Finish: ${analysis.specifications.finish}.`
        : ""
    } Professional product photography, studio lighting, high quality, realistic, no text or labels.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0]?.url || null;
  } catch (error) {
    console.error("Mockup generation error:", error);
    return null;
  }
}
