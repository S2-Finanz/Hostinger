const POINTS = [
  {
    title: "Spezialisierte Expertise",
    text: "PKV, Beamtenversorgung, Einkommensschutz und Vermögensaufbau.",
  },
  {
    title: "Unabhängige Beratung",
    text: "Dem Kunden verpflichtet, nicht einzelnen Versicherern.",
  },
  {
    title: "Echte Ansprechpartner",
    text: "Feste Betreuung von Mensch zu Mensch.",
  },
];

export default function TrustBlock() {
  return (
    <section className="bg-[#FBF8F2] py-[104px] max-[899px]:py-[72px] max-[640px]:py-[56px]">
      <div className="mx-auto box-border max-w-[1180px] px-6 max-[640px]:px-5">
        <div className="grid grid-cols-[minmax(0,397.5px)_minmax(0,662.5px)] gap-x-[120px] max-[899px]:grid-cols-1 max-[899px]:gap-x-0 max-[899px]:gap-y-12">
          <div className="min-w-0">
            <p className="mb-[18px] font-sans text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#C8A265] max-[640px]:text-[10px]">
              Vertrauen durch Klarheit
            </p>
            <h2
              className="font-sans font-bold text-[#171B1A]"
              style={{
                fontSize: "clamp(42px, 4vw, 51.32px)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              <span className="block whitespace-nowrap max-[899px]:whitespace-normal">
                Zwei Experten.
              </span>
              <span className="block">Ein Fokus.</span>
            </h2>
          </div>

          <div className="min-w-0">
            <p className="mb-[34px] font-sans text-[21px] font-normal leading-[1.55] text-[#171B1A] max-[640px]:mb-6 max-[640px]:text-[18px]">
              Wir machen komplexe Finanz- und Versicherungsthemen einfach –
              persönlich, transparent und ohne Umwege.
            </p>

            <div className="grid w-full grid-cols-3 gap-7 max-[899px]:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] max-[640px]:grid-cols-1 max-[640px]:gap-6">
              {POINTS.map((point) => (
                <div
                  key={point.title}
                  className="min-w-0 box-border border-t border-[rgba(23,27,26,0.14)] pt-[17px]"
                >
                  <p className="mb-2 whitespace-normal font-sans text-base font-bold leading-[1.2] text-[#171B1A] min-[1240px]:whitespace-nowrap">
                    {point.title}
                  </p>
                  <p
                    className="font-sans text-sm leading-[1.55] text-[#626B68]"
                    style={{ overflowWrap: "normal" }}
                  >
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
