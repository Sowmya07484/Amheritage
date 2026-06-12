
"use client";

import React, { useState, useEffect } from 'react';
import { generateHeritageQuizQuestion, GenerateHeritageQuizQuestionOutput } from '@/ai/flows/generate-heritage-quiz-question';
import { THEMATIC_ERAS } from '@/lib/game-types';
import { STATIC_HERITAGE_QUESTIONS } from '@/lib/static-questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle2, XCircle, Info, Timer } from 'lucide-react';

interface QuizOverlayProps {
  level: number;
  onAnswer: (correct: boolean) => void;
}

const TOTAL_TIME = 600; // 10 minutes in seconds

export function QuizOverlay({ level, onAnswer }: QuizOverlayProps) {
  const [question, setQuestion] = useState<GenerateHeritageQuizQuestionOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    async function fetchQuestion() {
      setLoading(true);
      
      const staticIndex = Math.floor(Math.random() * STATIC_HERITAGE_QUESTIONS.length);
      const useStatic = Math.random() > 0.3 || level <= 3;

      if (useStatic && STATIC_HERITAGE_QUESTIONS.length > 0) {
        const q = STATIC_HERITAGE_QUESTIONS[staticIndex];
        setQuestion({
          question: q.question,
          options: q.options as [string, string, string, string],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty: 'Medium',
          category: q.category
        });
        setLoading(false);
      } else {
        const randomEra = THEMATIC_ERAS[Math.floor(Math.random() * THEMATIC_ERAS.length)];
        try {
          const result = await generateHeritageQuizQuestion({ level, thematicEra: randomEra });
          setQuestion(result);
        } catch (e) {
          console.error("Failed to load question", e);
          const q = STATIC_HERITAGE_QUESTIONS[0];
          setQuestion({
            question: q.question,
            options: q.options as [string, string, string, string],
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            difficulty: 'Easy',
            category: q.category
          });
        } finally {
          setLoading(false);
        }
      }
    }
    fetchQuestion();
  }, [level]);

  // Timer Logic
  useEffect(() => {
    if (loading || selectedOption || !question) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSelect('TIMEOUT_AUTO_FAIL'); // Trigger fail on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, selectedOption, question]);

  const handleSelect = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    setShowExplanation(true);
    
    setTimeout(() => {
      onAnswer(option === question?.correctAnswer);
    }, 3500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timerPercentage = (timeLeft / TOTAL_TIME) * 100;

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
        {/* Animated Background Progress for Timer */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
          <div 
            className={`h-full transition-all duration-1000 ease-linear ${
              timeLeft < 60 ? 'bg-accent' : 'bg-primary'
            }`}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>

        <CardHeader className="pt-8 text-center space-y-4">
          <div className="flex justify-between items-center px-2">
             <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                <Timer className={`w-4 h-4 ${timeLeft < 60 ? 'text-accent animate-pulse' : 'text-primary'}`} />
                <span className={`text-sm font-black italic tracking-tighter ${timeLeft < 60 ? 'text-accent' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
             </div>
             <div className="flex gap-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 uppercase tracking-widest text-[8px]">
                  {question.category}
                </Badge>
                <Badge variant="outline" className="text-white/40 border-white/10 uppercase tracking-widest text-[8px]">
                  {question.difficulty}
                </Badge>
             </div>
          </div>
          
          <CardTitle className="text-2xl font-headline font-bold text-white leading-tight">
            {question.question}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-3 mt-2">
          {question.options.map((option, i) => {
            const isCorrect = option === question.correctAnswer;
            const isSelected = option === selectedOption;
            let variant: "outline" | "default" | "destructive" | "secondary" = "outline";
            
            if (showExplanation) {
              if (isCorrect) variant = "default";
              else if (isSelected) variant = "destructive";
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
                    {timeLeft === 0 && selectedOption === 'TIMEOUT_AUTO_FAIL' 
                      ? "Time ran out! You must answer more quickly to protect our heritage."
                      : question.explanation}
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
