import type { CreateRoomResponse } from "@/http/types/create-room-response";
import type { CreateRoomRequest } from "@/http/types/create-room-request";
import { BASE_URL } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoomRequest) => {
      const response = await fetch(`${BASE_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result: CreateRoomResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ 'queryKey': ['get-rooms'] })
    }
  })
}