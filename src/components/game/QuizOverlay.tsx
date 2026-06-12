"use client";

import React, { useState, useEffect } from 'react';
import { generateHeritageQuizQuestion, GenerateHeritageQuizQuestionOutput } from '@/ai/flows/generate-heritage-quiz-question';
import { THEMATIC_ERAS } from '@/lib/game-types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, XCircle, Info } from 'lucide-react';

interface QuizOverlayProps {
  level: number;
  onAnswer: (correct: boolean) => void;
}

export function QuizOverlay({ level, onAnswer }: QuizOverlayProps) {
  const [question, setQuestion] = useState<GenerateHeritageQuizQuestionOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    async function fetchQuestion() {
      setLoading(true);
      const randomEra = THEMATIC_ERAS[Math.floor(Math.random() * THEMATIC_ERAS.length)];
      try {
        const result = await generateHeritageQuizQuestion({ level, thematicEra: randomEra });
        setQuestion(result);
      } catch (e) {
        console.error("Failed to load question", e);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestion();
  }, [level]);

  const handleSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setShowExplanation(true);
    
    setTimeout(() => {
      onAnswer(option === question?.correctAnswer);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-xl font-headline font-bold text-white uppercase tracking-tighter">Preparing Heritage Challenge...</p>
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
      <Card className="w-full max-w-lg bg-card border-white/10 shadow-2xl relative overflow-hidden">
        {/* Progress Decoration */}
        <div className="absolute top-0 left-0 w-full h-1.5 flex">
          <div className="h-full bg-primary flex-1" />
          <div className="h-full bg-accent flex-1" />
          <div className="h-full bg-white/20 flex-1" />
        </div>

        <CardHeader className="pt-8 text-center">
          <div className="flex justify-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-[8px]">
              {question.category}
            </Badge>
            <Badge variant="outline" className="text-white/40 border-white/10 uppercase tracking-widest text-[8px]">
              {question.difficulty}
            </Badge>
          </div>
          <CardTitle className="text-2xl font-headline font-bold text-white leading-tight">
            {question.question}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-3 mt-4">
          {question.options.map((option, i) => {
            const isCorrect = option === question.correctAnswer;
            const isSelected = option === selectedOption;
            let variant: "outline" | "default" | "destructive" | "secondary" = "outline";
            
            if (showExplanation) {
              if (isCorrect) variant = "default"; // Will show primary blue (Correct)
              else if (isSelected) variant = "destructive"; // Show red (Incorrect)
            }

            return (
              <Button
                key={i}
                variant={variant}
                className={`h-auto py-4 px-6 text-left justify-start transition-all duration-300 relative overflow-hidden text-sm font-medium ${
                  showExplanation && isCorrect ? 'bg-green-600 hover:bg-green-600 border-none' : ''
                } ${
                  showExplanation && !isCorrect && isSelected ? 'bg-red-600 hover:bg-red-600 border-none' : ''
                } ${!selectedOption && 'hover:bg-primary/10 hover:border-primary/50'}`}
                disabled={!!selectedOption}
                onClick={() => handleSelect(option)}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black italic">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </span>
                {showExplanation && isCorrect && <CheckCircle2 className="absolute right-4 w-5 h-5 text-white animate-in zoom-in" />}
                {showExplanation && !isCorrect && isSelected && <XCircle className="absolute right-4 w-5 h-5 text-white animate-in zoom-in" />}
              </Button>
            );
          })}

          {showExplanation && (
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 animate-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Did you know?</p>
                  <p className="text-xs text-white/70 leading-relaxed font-medium">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
