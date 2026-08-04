"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

export default function Unterschriftsfeld({
  onGeaendert,
}: {
  onGeaendert: (bildDatenUrl: string | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zeichnetRef = useRef(false);
  const [hatInhalt, setHatInhalt] = useState(false);

  function position(e: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function starten(e: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    zeichnetRef.current = true;
    const { x, y } = position(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function zeichnen(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (!zeichnetRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { x, y } = position(e);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0E1211";
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hatInhalt) setHatInhalt(true);
  }

  function beenden() {
    zeichnetRef.current = false;
    const canvas = canvasRef.current;
    if (canvas && hatInhalt) {
      onGeaendert(canvas.toDataURL("image/png"));
    }
  }

  function leeren() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHatInhalt(false);
    onGeaendert(null);
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        onPointerDown={starten}
        onPointerMove={zeichnen}
        onPointerUp={beenden}
        onPointerLeave={beenden}
        className="block w-full touch-none rounded-sm border border-white/15 bg-white"
        style={{ aspectRatio: "3 / 1" }}
      />
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-nebel">Mit Finger, Stift oder Maus unterschreiben.</p>
        <button
          type="button"
          onClick={leeren}
          className="text-xs text-nebel underline-offset-2 hover:text-white hover:underline"
        >
          Löschen
        </button>
      </div>
    </div>
  );
}
