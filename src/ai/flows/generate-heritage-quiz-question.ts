'use server';
/**
 * @fileOverview A Genkit flow for generating multiple-choice quiz questions about American history and culture.
 *
 * - generateHeritageQuizQuestion - A function that generates a quiz question based on level and thematic era.
 * - GenerateHeritageQuizQuestionInput - The input type for the generateHeritageQuizQuestion function.
 * - GenerateHeritageQuizQuestionOutput - The return type for the generateHeritageQuizQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateHeritageQuizQuestionInputSchema = z.object({
  level: z
    .number()
    .int()
    .min(1)
    .describe("The player's current level, used to determine difficulty."),
  thematicEra: z
    .string()
    .describe(
      'The current thematic era for the game (e.g., "American Revolution", "Civil Rights Movement", "U.S. Presidents").'
    ),
});
export type GenerateHeritageQuizQuestionInput = z.infer<
  typeof GenerateHeritageQuizQuestionInputSchema
>;

const GenerateHeritageQuizQuestionOutputSchema = z.object({
  question: z.string().describe('The multiple-choice quiz question.'),
  options: z
    .array(z.string())
    .length(4)
    .describe('An array of four possible answers for the question.'),
  correctAnswer: z
    .string()
    .describe('The correct answer, which must be one of the options.'),
  explanation: z
    .string()
    .optional()
    .describe(
      'An optional explanation for why the correct answer is correct.'
    ),
  difficulty: z
    .enum(['Easy', 'Medium', 'Hard'])
    .describe('The difficulty level of the question, based on the input level.'),
  category: z
    .string()
    .describe('The category of the question (e.g., "Founding Fathers").'),
});
export type GenerateHeritageQuizQuestionOutput = z.infer<
  typeof GenerateHeritageQuizQuestionOutputSchema
>;

export async function generateHeritageQuizQuestion(
  input: GenerateHeritageQuizQuestionInput
): Promise<GenerateHeritageQuizQuestionOutput> {
  return generateHeritageQuizQuestionFlow(input);
}

const quizPrompt = ai.definePrompt({
  name: 'generateHeritageQuizQuestionPrompt',
  input: { schema: GenerateHeritageQuizQuestionInputSchema },
  output: { schema: GenerateHeritageQuizQuestionOutputSchema },
  prompt: `You are an expert in American history and culture, tasked with creating educational quiz questions for a mobile game.

Generate a multiple-choice question with four options, identifying the correct answer, and providing a brief explanation for the correct answer. Also, assign a difficulty and category based on the input.

Guidelines for question generation:
- The question should be directly related to the "{{thematicEra}}" era.
- The difficulty should be tailored to the player's level:
  - Levels 1-10: Easy
  - Levels 11-20: Medium
  - Levels 21+: Hard
- The 'correctAnswer' field MUST exactly match one of the strings in the 'options' array.
- The 'options' array must contain exactly four distinct strings.
- Ensure the category is concise and relevant to the question topic.

Here are some examples of thematic eras and topics:
- American Revolution: Questions about key figures, battles, or foundational documents.
- Founding Fathers: Questions about individual contributions, ideas, or roles.
- Constitution: Questions about articles, amendments, or principles.
- Civil Rights Movement: Questions about leaders, events, or legislation.
- National Parks: Questions about famous parks, their history, or natural features.
- Famous Monuments: Questions about landmarks, their significance, or architects.
- Space Exploration: Questions about missions, astronauts, or scientific achievements.
- U.S. Presidents: Questions about presidential terms, policies, or historical impact.
- American Culture: Questions about traditions, art, music, or iconic symbols.
- Important Historical Events: Questions about specific dates, causes, or consequences.

Generate a question for Level {{level}} focusing on the "{{thematicEra}}".`,
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
