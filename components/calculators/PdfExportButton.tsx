"use client";

export default function PdfExportButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-sm border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
    >
      Als PDF herunterladen
    </button>
  );
}
