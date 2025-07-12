import { useQuery } from "@tanstack/react-query";

import { BASE_URL } from "@/services/api";
import type { GetRoomsResponse } from "./types/get-rooms-response";

export function useRooms() {
  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/rooms`)
      const result: GetRoomsResponse = await response.json();

      return result;
    }
  });
}