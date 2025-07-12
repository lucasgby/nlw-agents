import type { CreateQuestionResquest } from "@/http/types/create-question-request";
import type { CreateQuestionResponse } from "@/http/types/create-question-response";
import type { GetRoomQuestionResponse } from "@/http/types/get-room-questions-response";
import { BASE_URL } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestionResquest) => {
      const response = await fetch(`${BASE_URL}/rooms/${roomId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result: CreateQuestionResponse = await response.json();

      return result;
    },

    onMutate({ question }) {
      const questions = queryClient.getQueryData<GetRoomQuestionResponse>([
        'get-questions',
        roomId,
      ])

      const questionsArray = questions ?? [];

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toString(),
        isGeneratingAnswer: true
      }

      queryClient.setQueryData<GetRoomQuestionResponse>(
        ['get-questions', roomId],
        [newQuestion, ...questionsArray]
      )

      return { newQuestion, questions };
    },

    onSuccess(data, _variables, context) {
      queryClient.setQueryData<GetRoomQuestionResponse>(
        ['get-questions', roomId],
        questions => {
          if (!questions) {
            return questions
          }

          if(!context.newQuestion){
            return questions
          }

          return questions.map(question => {
            if (question.id === context.newQuestion.id){
              return { 
                ...context.newQuestion, 
                id: data.questionId, 
                answer: data.answer,
                isGeneratingAnswer: false
              }
            }

            return question
          })
        }
      )
    },

    onError(_error, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionResponse>(
          ['get-questions', roomId],
          context.questions
        )
      }
    }
  })
}