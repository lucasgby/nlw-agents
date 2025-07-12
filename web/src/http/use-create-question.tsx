import type { CreateQuestionResquest } from "@/http/types/create-question-request";
import type { CreateQuestionResponse } from "@/http/types/create-question-response";
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

    onSuccess: () => {
      queryClient.invalidateQueries({ 'queryKey': ['get-questions', roomId] })
    }
  })
}