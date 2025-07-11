import { CreateRoom } from "@/pages/create-room";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { Room } from "@/pages/room";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateRoom />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}