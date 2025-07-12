import type { GetRoomQuestionResponse } from "@/http/types/get-room-questions-response";
import { BASE_URL } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/rooms/${roomId}/questions`)
      const result: GetRoomQuestionResponse = await response.json();

      return result;
    }
  });
}