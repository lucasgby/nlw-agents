import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/services/api";
import { ArrowRight } from "lucide-react";

type GetRoomsAPIResponse = Array<{
  id: string,
  name: string;
  questionsCount: number;
  createdAt: string
}>

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/rooms`)
      const result: GetRoomsAPIResponse = await response.json();

      return result;
    }
  });

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 grid-cols-2 items-start">
          <div />

          <Card>
            <CardHeader>
              <CardTitle>
                Salas recentes
              </CardTitle>

              <CardDescription>
                Acesso rápido para as salas criadas recentemente
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
              {data?.map(room => {
                return (
                  <div
                    key={room.id}
                    className="flex items-center justify-between p-3 rouded-lg border cursor-pointer hover:bg-accent"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{room.name}</h3>
                    </div>

                    <span className="flex items-center gap-1 text-sm">
                      Entrar
                      <ArrowRight className="size-3" />
                    </span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}