export type ErfahrungsstufeBetrag = {
  stufe: number;
  betrag: number;
};

export type BesoldungsgruppeDaten = {
  gruppe: string;
  label: string;
  stufen: ErfahrungsstufeBetrag[];
};

export type Kennzahl = {
  label: string;
  betrag: number;
};

export type ZusatzTabelle = {
  gueltigAb?: string;
  posten: Kennzahl[];
  hinweis?: string;
};

export type BesoldungstabelleLand = {
  code: string;
  name: string;
  verfuegbar: boolean;
  gueltigAb?: string;
  entwurf?: boolean;
  gruppen: BesoldungsgruppeDaten[];
  familienzuschlag?: ZusatzTabelle;
  anwaerter?: ZusatzTabelle;
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
