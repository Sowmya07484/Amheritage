'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateHeritageQuizQuestionInputSchema = z.object({
  level: z.number().int().min(1),
  thematicEra: z.string(),
});

const GenerateHeritageQuizQuestionOutputSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctAnswer: z.string(),
  explanation: z.string().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  category: z.string(),
});

export async function generateHeritageQuizQuestion(
  input: z.infer<typeof GenerateHeritageQuizQuestionInputSchema>
): Promise<z.infer<typeof GenerateHeritageQuizQuestionOutputSchema>> {
  return generateHeritageQuizQuestionFlow(input);
}

const quizPrompt = ai.definePrompt({
  name: 'generateHeritageQuizQuestionPrompt',
  input: { schema: GenerateHeritageQuizQuestionInputSchema },
  output: { schema: GenerateHeritageQuizQuestionOutputSchema },
  prompt: `You are an expert in American heritage, history, culture, and geography.
Generate a high-quality multiple-choice question for a patriotic educational game.

Topic: {{thematicEra}}
Difficulty Level: {{level}}

Rules:
- Questions should be interesting, factual, and patriotic.
- For levels 1-5, focus on basic geography and famous figures.
- For levels 6-15, focus on constitutional principles, important laws, and cultural icons.
- For levels 16+, focus on deep historical nuance and complex events.
- Ensure the 'correctAnswer' is exactly one of the options.
- Provide a brief 'explanation' that teaches the player something new.

Generate a JSON object with: question, options (array of 4), correctAnswer, explanation, difficulty, and category.`,
});

const generateHeritageQuizQuestionFlow = ai.defineFlow(
  {
    name: 'generateHeritageQuizQuestionFlow',
    inputSchema: GenerateHeritageQuizQuestionInputSchema,
    outputSchema: GenerateHeritageQuizQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await quizPrompt(input);
    return output!;
  }
);
