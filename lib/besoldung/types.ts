export type ErfahrungsstufeBetrag = {
  stufe: number;
  betrag: number;
};

export type BesoldungsgruppeDaten = {
  gruppe: string;
  label: string;
  stufen: ErfahrungsstufeBetrag[];
};

export type BesoldungstabelleLand = {
  code: string;
  name: string;
  verfuegbar: boolean;
  gueltigAb?: string;
  gruppen: BesoldungsgruppeDaten[];
};

export type TeilzeitPhase = {
  id: string;
  dauerJahre: number;
  quoteProzent: number;
};

export type ElternzeitPhase = {
  id: string;
  kindNummer: number;
  dauerJahre: number;
};
