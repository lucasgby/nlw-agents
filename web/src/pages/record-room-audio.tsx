import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/services/api";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported =
  !!navigator.mediaDevices
  && typeof navigator.mediaDevices.getUserMedia === 'function'
  && typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string;
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const invervalRef = useRef<NodeJS.Timeout>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }

    if (invervalRef.current) {
      clearInterval(invervalRef.current);
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append('file', audio, 'audio.webm');

    const response = await fetch(`${BASE_URL}/rooms/${params.roomId}/audio`, {
      method: 'POST',
      body: formData
    });

    await response.json();
    
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000
    });

    recorder.current.ondataavailable = event => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      // biome-ignore lint/suspicious/noConsole: necessário para debug
      console.log('Gravação iniciada!')
    }

    recorder.current.onstop = () => {
      // biome-ignore lint/suspicious/noConsole: necessário para debug
      console.log('Gravação encerrada/pausada')
    }

    recorder.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação')
      return
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      }
    });

    createRecorder(audio);

    invervalRef.current = setInterval(() => {
      recorder.current?.stop()

      createRecorder(audio);
    }, 5000);
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Pausar áudio</Button>
      ) : (
        <Button onClick={startRecording}>Iniciar gravação</Button>
      )}

      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  )
}