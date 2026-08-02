import type { BesoldungstabelleLand } from "@/lib/besoldung/types";

// Erfahrungsstufen-Rhythmus: Jahre bis zum jeweils naechsten Stufenaufstieg.
// Naeherungswert (ueblicher Rhythmus mehrerer Laender); die tatsaechliche
// Steigerungsdauer kann je Land/Besoldungsgruppe geringfuegig abweichen.
// Die Stufen-BETRAEGE selbst sind exakt aus den Quelltabellen uebernommen.
export const STUFEN_RHYTHMUS_JAHRE = [1, 2, 2, 3, 3, 4, 4, 4, 4];

// Datenquelle: www.dbb.de (dbb beamtenbund und tarifunion), Besoldungstabellen 2025/2026.
// Teilweise Referentenentwuerfe/Prognosen vor Verkuendung im jeweiligen Gesetzblatt.
// Hinweis Erfahrungsstufen: viele Laender weisen fuer hoehere Besoldungsgruppen
// (Befoerderungsaemter) eine hoehere Mindest-Erfahrungsstufe aus als Stufe 1 -
// die Stufennummerierung je Besoldungsgruppe ist daher NICHT immer bei 1 verankert.
// Fehler und Irrtuemer vorbehalten.
export const BESOLDUNGSTABELLEN: BesoldungstabelleLand[] = [
  {
    code: "bund",
    name: "Bund",
    verfuegbar: true,
    gueltigAb: "2024-03-01",
    entwurf: false,
    familienzuschlag: {
      gueltigAb: "2024-03-01",
      posten: [{ label: "Stufe 1", betrag: 171.28 }, { label: "Stufe 2", betrag: 317.66 }, { label: "Erhöhung für das zweite Kind", betrag: 146.38 }, { label: "Erhöhung ab dem dritten Kind (je Kind)", betrag: 456.06 }],
    },
    anwaerter: {
      gueltigAb: "2024-03-01",
      posten: [{ label: "einfacher Dienst", betrag: 1407.63 }, { label: "mittlerer Dienst", betrag: 1473.37 }, { label: "gehobener Dienst", betrag: 1744.22 }, { label: "höherer Dienst", betrag: 2624.08 }],
    },
    gruppen: [
      { gruppe: "A3", label: "A 3", stufen: [{ stufe: 1, betrag: 2706.99 }, { stufe: 2, betrag: 2763.31 }, { stufe: 3, betrag: 2819.66 }, { stufe: 4, betrag: 2865.01 }, { stufe: 5, betrag: 2910.36 }, { stufe: 6, betrag: 2955.72 }, { stufe: 7, betrag: 3001.08 }, { stufe: 8, betrag: 3046.42 }] },
      { gruppe: "A4", label: "A 4", stufen: [{ stufe: 1, betrag: 2759.23 }, { stufe: 2, betrag: 2826.55 }, { stufe: 3, betrag: 2893.88 }, { stufe: 4, betrag: 2947.47 }, { stufe: 5, betrag: 3001.08 }, { stufe: 6, betrag: 3054.68 }, { stufe: 7, betrag: 3108.26 }, { stufe: 8, betrag: 3157.76 }] },
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 1, betrag: 2778.44 }, { stufe: 2, betrag: 2862.26 }, { stufe: 3, betrag: 2929.59 }, { stufe: 4, betrag: 2995.58 }, { stufe: 5, betrag: 3061.57 }, { stufe: 6, betrag: 3128.91 }, { stufe: 7, betrag: 3194.84 }, { stufe: 8, betrag: 3259.46 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 1, betrag: 2833.40 }, { stufe: 2, betrag: 2931.00 }, { stufe: 3, betrag: 3029.92 }, { stufe: 4, betrag: 3105.51 }, { stufe: 5, betrag: 3183.86 }, { stufe: 6, betrag: 3259.46 }, { stufe: 7, betrag: 3343.26 }, { stufe: 8, betrag: 3416.11 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 1, betrag: 2963.97 }, { stufe: 2, betrag: 3050.57 }, { stufe: 3, betrag: 3164.65 }, { stufe: 4, betrag: 3281.42 }, { stufe: 5, betrag: 3395.49 }, { stufe: 6, betrag: 3510.94 }, { stufe: 7, betrag: 3597.53 }, { stufe: 8, betrag: 3684.10 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 1, betrag: 3123.39 }, { stufe: 2, betrag: 3227.85 }, { stufe: 3, betrag: 3374.87 }, { stufe: 4, betrag: 3523.33 }, { stufe: 5, betrag: 3671.73 }, { stufe: 6, betrag: 3774.80 }, { stufe: 7, betrag: 3879.24 }, { stufe: 8, betrag: 3982.32 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 1, betrag: 3354.26 }, { stufe: 2, betrag: 3457.34 }, { stufe: 3, betrag: 3619.52 }, { stufe: 4, betrag: 3784.42 }, { stufe: 5, betrag: 3946.56 }, { stufe: 6, betrag: 4056.80 }, { stufe: 7, betrag: 4171.47 }, { stufe: 8, betrag: 4283.30 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 1, betrag: 3575.51 }, { stufe: 2, betrag: 3717.07 }, { stufe: 3, betrag: 3921.86 }, { stufe: 4, betrag: 4127.55 }, { stufe: 5, betrag: 4337.08 }, { stufe: 6, betrag: 4482.89 }, { stufe: 7, betrag: 4628.67 }, { stufe: 8, betrag: 4774.53 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 1, betrag: 4056.80 }, { stufe: 2, betrag: 4273.37 }, { stufe: 3, betrag: 4488.54 }, { stufe: 4, betrag: 4705.13 }, { stufe: 5, betrag: 4853.76 }, { stufe: 6, betrag: 5002.40 }, { stufe: 7, betrag: 5151.04 }, { stufe: 8, betrag: 5299.72 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 1, betrag: 4334.26 }, { stufe: 2, betrag: 4590.49 }, { stufe: 3, betrag: 4848.12 }, { stufe: 4, betrag: 5104.32 }, { stufe: 5, betrag: 5282.70 }, { stufe: 6, betrag: 5458.23 }, { stufe: 7, betrag: 5635.18 }, { stufe: 8, betrag: 5814.97 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 1, betrag: 5046.30 }, { stufe: 2, betrag: 5286.94 }, { stufe: 3, betrag: 5526.17 }, { stufe: 4, betrag: 5766.83 }, { stufe: 5, betrag: 5932.45 }, { stufe: 6, betrag: 6099.51 }, { stufe: 7, betrag: 6265.11 }, { stufe: 8, betrag: 6427.89 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 1, betrag: 5183.60 }, { stufe: 2, betrag: 5493.61 }, { stufe: 3, betrag: 5805.04 }, { stufe: 4, betrag: 6115.06 }, { stufe: 5, betrag: 6328.80 }, { stufe: 6, betrag: 6544.01 }, { stufe: 7, betrag: 6757.73 }, { stufe: 8, betrag: 6972.92 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 1, betrag: 6289.17 }, { stufe: 2, betrag: 6569.48 }, { stufe: 3, betrag: 6783.22 }, { stufe: 4, betrag: 6997.00 }, { stufe: 5, betrag: 7210.74 }, { stufe: 6, betrag: 7423.08 }, { stufe: 7, betrag: 7635.43 }, { stufe: 8, betrag: 7846.32 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 1, betrag: 6916.29 }, { stufe: 2, betrag: 7241.90 }, { stufe: 3, betrag: 7488.19 }, { stufe: 4, betrag: 7734.52 }, { stufe: 5, betrag: 7979.41 }, { stufe: 6, betrag: 8227.16 }, { stufe: 7, betrag: 8473.46 }, { stufe: 8, betrag: 8716.97 }] },
    ],
  },
  {
    code: "bw",
    name: "Baden-Württemberg",
    verfuegbar: true,
    gueltigAb: "2026-04-01",
    entwurf: true,
    familienzuschlag: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "Ehebezogener Teil (Stufe 1)", betrag: 180.46 }, { label: "Kinderbezogener Teil – 1. und 2. Kind (je Kind)", betrag: 157.78 }, { label: "Kinderbezogener Teil – ab 3. Kind (je Kind)", betrag: 989.17 }, { label: "Anrechnungsbetrag nach § 40 Satz 3", betrag: 82.42 }],
    },
    anwaerter: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "A 7 bis A 9", betrag: 1552.89 }, { label: "A 10 und A 11", betrag: 1608.78 }, { label: "A 12", betrag: 1753.53 }, { label: "A 13", betrag: 1786.46 }, { label: "A 13 mit Strukturzulage", betrag: 1822.62 }],
    },
    gruppen: [
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 1, betrag: 3220.85 }, { stufe: 2, betrag: 3314.32 }, { stufe: 3, betrag: 3407.74 }, { stufe: 4, betrag: 3501.18 }, { stufe: 5, betrag: 3594.68 }, { stufe: 6, betrag: 3661.40 }, { stufe: 7, betrag: 3728.15 }, { stufe: 8, betrag: 3794.93 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 1, betrag: 3302.04 }, { stufe: 2, betrag: 3421.84 }, { stufe: 3, betrag: 3541.57 }, { stufe: 4, betrag: 3661.34 }, { stufe: 5, betrag: 3781.13 }, { stufe: 6, betrag: 3860.96 }, { stufe: 7, betrag: 3940.79 }, { stufe: 8, betrag: 4020.67 }, { stufe: 9, betrag: 4100.47 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 1, betrag: 3480.07 }, { stufe: 2, betrag: 3607.89 }, { stufe: 3, betrag: 3735.69 }, { stufe: 4, betrag: 3863.51 }, { stufe: 5, betrag: 3991.30 }, { stufe: 6, betrag: 4079.21 }, { stufe: 7, betrag: 4167.09 }, { stufe: 8, betrag: 4254.95 }, { stufe: 9, betrag: 4342.82 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 1, betrag: 3737.00 }, { stufe: 2, betrag: 3900.74 }, { stufe: 3, betrag: 4064.51 }, { stufe: 4, betrag: 4228.29 }, { stufe: 5, betrag: 4392.05 }, { stufe: 6, betrag: 4503.15 }, { stufe: 7, betrag: 4614.82 }, { stufe: 8, betrag: 4726.51 }, { stufe: 9, betrag: 4838.21 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 1, betrag: 4108.34 }, { stufe: 2, betrag: 4276.16 }, { stufe: 3, betrag: 4444.56 }, { stufe: 4, betrag: 4616.23 }, { stufe: 5, betrag: 4787.90 }, { stufe: 6, betrag: 4902.37 }, { stufe: 7, betrag: 5018.38 }, { stufe: 8, betrag: 5135.16 }, { stufe: 9, betrag: 5251.92 }, { stufe: 10, betrag: 5368.64 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 2, betrag: 4654.11 }, { stufe: 3, betrag: 4790.54 }, { stufe: 4, betrag: 4996.39 }, { stufe: 5, betrag: 5205.14 }, { stufe: 6, betrag: 5344.34 }, { stufe: 7, betrag: 5483.49 }, { stufe: 8, betrag: 5622.69 }, { stufe: 9, betrag: 5761.88 }, { stufe: 10, betrag: 5901.07 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 3, betrag: 5332.12 }, { stufe: 4, betrag: 5557.55 }, { stufe: 5, betrag: 5783.02 }, { stufe: 6, betrag: 5933.32 }, { stufe: 7, betrag: 6083.60 }, { stufe: 8, betrag: 6233.90 }, { stufe: 9, betrag: 6384.24 }, { stufe: 10, betrag: 6534.50 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 3, betrag: 5652.72 }, { stufe: 4, betrag: 5945.07 }, { stufe: 5, betrag: 6237.43 }, { stufe: 6, betrag: 6432.31 }, { stufe: 7, betrag: 6627.24 }, { stufe: 8, betrag: 6822.10 }, { stufe: 9, betrag: 7017.00 }, { stufe: 10, betrag: 7211.94 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 4, betrag: 6507.80 }, { stufe: 5, betrag: 6829.20 }, { stufe: 6, betrag: 7086.35 }, { stufe: 7, betrag: 7343.48 }, { stufe: 8, betrag: 7600.63 }, { stufe: 9, betrag: 7857.75 }, { stufe: 10, betrag: 8114.92 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 4, betrag: 7156.33 }, { stufe: 5, betrag: 7528.05 }, { stufe: 6, betrag: 7825.49 }, { stufe: 7, betrag: 8122.89 }, { stufe: 8, betrag: 8420.26 }, { stufe: 9, betrag: 8717.65 }, { stufe: 10, betrag: 9015.04 }] },
    ],
  },
  {
    code: "by",
    name: "Bayern",
    verfuegbar: true,
    gueltigAb: "2026-10-01",
    entwurf: true,
    familienzuschlag: {
      gueltigAb: "2026-10-01",
      posten: [],
      hinweis: "Der Orts- und Familienzuschlag ist in Bayern zusätzlich nach Ortsklasse (I–VII) gestaffelt und daher hier nicht in einer Zeile darstellbar. Für eine Einzelfallberechnung sprechen Sie uns gerne an.",
    },
    anwaerter: {
      gueltigAb: "2026-10-01",
      posten: [{ label: "A 3 bis A 4", betrag: 1449.33 }, { label: "A 5 bis A 8", betrag: 1569.93 }, { label: "A 9 bis A 11", betrag: 1623.85 }, { label: "A 12", betrag: 1763.44 }, { label: "A 13", betrag: 1795.21 }, { label: "A 13 + Zulage gemäß Art. 33 Satz 1", betrag: 1830.08 }],
    },
    gruppen: [
      { gruppe: "A3", label: "A 3", stufen: [{ stufe: 2, betrag: 2862.51 }, { stufe: 3, betrag: 2918.48 }, { stufe: 4, betrag: 2974.44 }, { stufe: 5, betrag: 3030.39 }, { stufe: 6, betrag: 3086.39 }, { stufe: 7, betrag: 3142.33 }, { stufe: 8, betrag: 3198.30 }, { stufe: 9, betrag: 3254.25 }] },
      { gruppe: "A4", label: "A 4", stufen: [{ stufe: 2, betrag: 2933.87 }, { stufe: 3, betrag: 2999.80 }, { stufe: 4, betrag: 3065.67 }, { stufe: 5, betrag: 3131.56 }, { stufe: 6, betrag: 3197.43 }, { stufe: 7, betrag: 3263.30 }, { stufe: 8, betrag: 3329.16 }, { stufe: 9, betrag: 3395.02 }] },
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 2, betrag: 2970.80 }, { stufe: 3, betrag: 3036.31 }, { stufe: 4, betrag: 3101.87 }, { stufe: 5, betrag: 3167.40 }, { stufe: 6, betrag: 3232.95 }, { stufe: 7, betrag: 3298.51 }, { stufe: 8, betrag: 3364.08 }, { stufe: 9, betrag: 3429.62 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 2, betrag: 3044.42 }, { stufe: 3, betrag: 3116.34 }, { stufe: 4, betrag: 3188.30 }, { stufe: 5, betrag: 3260.31 }, { stufe: 6, betrag: 3332.28 }, { stufe: 7, betrag: 3404.26 }, { stufe: 8, betrag: 3476.20 }, { stufe: 9, betrag: 3548.14 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 2, betrag: 3160.90 }, { stufe: 3, betrag: 3251.47 }, { stufe: 4, betrag: 3342.02 }, { stufe: 5, betrag: 3432.59 }, { stufe: 6, betrag: 3523.20 }, { stufe: 7, betrag: 3587.82 }, { stufe: 8, betrag: 3652.50 }, { stufe: 9, betrag: 3717.21 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 2, betrag: 3239.61 }, { stufe: 3, betrag: 3355.64 }, { stufe: 4, betrag: 3471.74 }, { stufe: 5, betrag: 3587.77 }, { stufe: 6, betrag: 3703.86 }, { stufe: 7, betrag: 3781.23 }, { stufe: 8, betrag: 3858.57 }, { stufe: 9, betrag: 3935.95 }, { stufe: 10, betrag: 4013.32 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 2, betrag: 3387.91 }, { stufe: 3, betrag: 3511.77 }, { stufe: 4, betrag: 3635.61 }, { stufe: 5, betrag: 3759.50 }, { stufe: 6, betrag: 3883.35 }, { stufe: 7, betrag: 3968.50 }, { stufe: 8, betrag: 4053.67 }, { stufe: 9, betrag: 4138.81 }, { stufe: 10, betrag: 4223.97 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 2, betrag: 3636.87 }, { stufe: 3, betrag: 3795.55 }, { stufe: 4, betrag: 3954.29 }, { stufe: 5, betrag: 4112.99 }, { stufe: 6, betrag: 4271.68 }, { stufe: 7, betrag: 4377.47 }, { stufe: 8, betrag: 4484.70 }, { stufe: 9, betrag: 4592.91 }, { stufe: 10, betrag: 4701.17 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 3, betrag: 4159.37 }, { stufe: 4, betrag: 4321.98 }, { stufe: 5, betrag: 4486.08 }, { stufe: 6, betrag: 4652.44 }, { stufe: 7, betrag: 4763.31 }, { stufe: 8, betrag: 4874.25 }, { stufe: 9, betrag: 4986.24 }, { stufe: 10, betrag: 5099.36 }, { stufe: 11, betrag: 5212.45 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 4, betrag: 4654.97 }, { stufe: 5, betrag: 4853.32 }, { stufe: 6, betrag: 5054.05 }, { stufe: 7, betrag: 5188.92 }, { stufe: 8, betrag: 5323.77 }, { stufe: 9, betrag: 5458.65 }, { stufe: 10, betrag: 5593.52 }, { stufe: 11, betrag: 5728.39 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 5, betrag: 5395.56 }, { stufe: 6, betrag: 5613.99 }, { stufe: 7, betrag: 5759.62 }, { stufe: 8, betrag: 5905.25 }, { stufe: 9, betrag: 6050.92 }, { stufe: 10, betrag: 6196.54 }, { stufe: 11, betrag: 6342.19 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 5, betrag: 5771.02 }, { stufe: 6, betrag: 6054.27 }, { stufe: 7, betrag: 6243.16 }, { stufe: 8, betrag: 6432.02 }, { stufe: 9, betrag: 6620.86 }, { stufe: 10, betrag: 6809.73 }, { stufe: 11, betrag: 6998.59 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 6, betrag: 6627.72 }, { stufe: 7, betrag: 6876.92 }, { stufe: 8, betrag: 7126.05 }, { stufe: 9, betrag: 7375.24 }, { stufe: 10, betrag: 7624.41 }, { stufe: 11, betrag: 7873.54 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 6, betrag: 7304.89 }, { stufe: 7, betrag: 7593.09 }, { stufe: 8, betrag: 7881.29 }, { stufe: 9, betrag: 8169.44 }, { stufe: 10, betrag: 8457.61 }, { stufe: 11, betrag: 8745.78 }] },
    ],
  },
  {
    code: "be",
    name: "Berlin",
    verfuegbar: true,
    gueltigAb: "2026-04-01",
    entwurf: false,
    familienzuschlag: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "Erstes Kind", betrag: 148.44 }, { label: "Zweites Kind", betrag: 148.44 }, { label: "Drittes Kind", betrag: 819.76 }, { label: "Viertes und jedes weitere Kind (je Kind)", betrag: 678.99 }],
    },
    anwaerter: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "A 5 bis A 8", betrag: 1557.66 }, { label: "A 9 bis A 11", betrag: 1617.45 }, { label: "A 12", betrag: 1772.25 }, { label: "A 13", betrag: 1807.47 }, { label: "A 13 + Zulage bzw. R 1", betrag: 1846.14 }],
    },
    gruppen: [
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 1, betrag: 2857.84 }, { stufe: 2, betrag: 2950.01 }, { stufe: 3, betrag: 3016.04 }, { stufe: 4, betrag: 3085.16 }, { stufe: 5, betrag: 3152.66 }, { stufe: 6, betrag: 3224.75 }, { stufe: 7, betrag: 3289.30 }, { stufe: 8, betrag: 3351.29 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 1, betrag: 2914.08 }, { stufe: 2, betrag: 2991.64 }, { stufe: 3, betrag: 3138.27 }, { stufe: 4, betrag: 3213.11 }, { stufe: 5, betrag: 3280.61 }, { stufe: 6, betrag: 3358.45 }, { stufe: 7, betrag: 3427.49 }, { stufe: 8, betrag: 3500.89 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 1, betrag: 3020.50 }, { stufe: 2, betrag: 3095.10 }, { stufe: 3, betrag: 3188.59 }, { stufe: 4, betrag: 3358.45 }, { stufe: 5, betrag: 3462.00 }, { stufe: 6, betrag: 3549.54 }, { stufe: 7, betrag: 3618.61 }, { stufe: 8, betrag: 3742.25 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 1, betrag: 3177.20 }, { stufe: 2, betrag: 3372.75 }, { stufe: 3, betrag: 3496.44 }, { stufe: 4, betrag: 3620.09 }, { stufe: 5, betrag: 3802.68 }, { stufe: 6, betrag: 3901.95 }, { stufe: 7, betrag: 3977.49 }, { stufe: 8, betrag: 4050.07 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 1, betrag: 3352.48 }, { stufe: 2, betrag: 3457.51 }, { stufe: 3, betrag: 3620.09 }, { stufe: 4, betrag: 3805.66 }, { stufe: 5, betrag: 3941.92 }, { stufe: 6, betrag: 4110.79 }, { stufe: 7, betrag: 4209.63 }, { stufe: 8, betrag: 4305.36 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 1, betrag: 3574.17 }, { stufe: 2, betrag: 3713.59 }, { stufe: 3, betrag: 3941.92 }, { stufe: 4, betrag: 4173.19 }, { stufe: 5, betrag: 4341.87 }, { stufe: 6, betrag: 4510.58 }, { stufe: 7, betrag: 4665.61 }, { stufe: 8, betrag: 4793.28 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 1, betrag: 4051.54 }, { stufe: 2, betrag: 4268.88 }, { stufe: 3, betrag: 4489.28 }, { stufe: 4, betrag: 4711.18 }, { stufe: 5, betrag: 4857.10 }, { stufe: 6, betrag: 5015.18 }, { stufe: 7, betrag: 5203.63 }, { stufe: 8, betrag: 5319.14 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 1, betrag: 4331.21 }, { stufe: 2, betrag: 4744.60 }, { stufe: 3, betrag: 4857.10 }, { stufe: 4, betrag: 5158.05 }, { stufe: 5, betrag: 5296.33 }, { stufe: 6, betrag: 5565.35 }, { stufe: 7, betrag: 5668.70 }, { stufe: 8, betrag: 5855.67 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 1, betrag: 5060.75 }, { stufe: 2, betrag: 5305.48 }, { stufe: 3, betrag: 5550.15 }, { stufe: 4, betrag: 5796.37 }, { stufe: 5, betrag: 6027.40 }, { stufe: 6, betrag: 6136.83 }, { stufe: 7, betrag: 6367.85 }, { stufe: 8, betrag: 6489.42 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 1, betrag: 5311.53 }, { stufe: 2, betrag: 5626.14 }, { stufe: 3, betrag: 5974.22 }, { stufe: 4, betrag: 6284.25 }, { stufe: 5, betrag: 6495.53 }, { stufe: 6, betrag: 6699.17 }, { stufe: 7, betrag: 6918.05 }, { stufe: 8, betrag: 7142.98 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 1, betrag: 6446.87 }, { stufe: 2, betrag: 6764.52 }, { stufe: 3, betrag: 6949.96 }, { stufe: 4, betrag: 7168.82 }, { stufe: 5, betrag: 7387.68 }, { stufe: 6, betrag: 7605.02 }, { stufe: 7, betrag: 7782.85 }, { stufe: 8, betrag: 8042.76 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 1, betrag: 7088.28 }, { stufe: 2, betrag: 7419.61 }, { stufe: 3, betrag: 7671.91 }, { stufe: 4, betrag: 7924.21 }, { stufe: 5, betrag: 8175.00 }, { stufe: 6, betrag: 8427.28 }, { stufe: 7, betrag: 8679.58 }, { stufe: 8, betrag: 8927.34 }] },
    ],
  },
  {
    code: "bb",
    name: "Brandenburg",
    verfuegbar: true,
    gueltigAb: "2026-01-01",
    entwurf: true,
    familienzuschlag: {
      gueltigAb: "2026-01-01",
      posten: [],
      hinweis: "Für Brandenburg lag uns zum Redaktionsschluss kein Familienzuschlag-Auszug vor.",
    },
    anwaerter: {
      gueltigAb: "2026-01-01",
      posten: [{ label: "A 5 bis A 8", betrag: 1578.37 }, { label: "A 9 bis A 11", betrag: 1631.43 }, { label: "A 12", betrag: 1768.84 }, { label: "A 13", betrag: 1800.10 }, { label: "A 13 + Zulage bzw. R 1", betrag: 1834.42 }],
    },
    gruppen: [
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 2, betrag: 2944.40 }, { stufe: 3, betrag: 3016.54 }, { stufe: 4, betrag: 3088.68 }, { stufe: 5, betrag: 3160.82 }, { stufe: 6, betrag: 3232.96 }, { stufe: 7, betrag: 3305.10 }, { stufe: 8, betrag: 3377.24 }, { stufe: 9, betrag: 3449.38 }, { stufe: 10, betrag: 3521.52 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 2, betrag: 3141.16 }, { stufe: 3, betrag: 3224.30 }, { stufe: 4, betrag: 3307.44 }, { stufe: 5, betrag: 3390.58 }, { stufe: 6, betrag: 3473.72 }, { stufe: 7, betrag: 3556.86 }, { stufe: 8, betrag: 3640.00 }, { stufe: 9, betrag: 3723.14 }, { stufe: 10, betrag: 3806.27 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 2, betrag: 3340.72 }, { stufe: 3, betrag: 3436.61 }, { stufe: 4, betrag: 3532.50 }, { stufe: 5, betrag: 3628.39 }, { stufe: 6, betrag: 3724.28 }, { stufe: 7, betrag: 3820.17 }, { stufe: 8, betrag: 3916.06 }, { stufe: 9, betrag: 4011.95 }, { stufe: 10, betrag: 4107.81 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 3, betrag: 3557.42 }, { stufe: 4, betrag: 3672.63 }, { stufe: 5, betrag: 3787.84 }, { stufe: 6, betrag: 3903.05 }, { stufe: 7, betrag: 4018.26 }, { stufe: 8, betrag: 4133.47 }, { stufe: 9, betrag: 4248.68 }, { stufe: 10, betrag: 4363.89 }, { stufe: 11, betrag: 4479.09 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 3, betrag: 3766.76 }, { stufe: 4, betrag: 3891.38 }, { stufe: 5, betrag: 4016.00 }, { stufe: 6, betrag: 4140.62 }, { stufe: 7, betrag: 4265.24 }, { stufe: 8, betrag: 4389.86 }, { stufe: 9, betrag: 4514.48 }, { stufe: 10, betrag: 4639.10 }, { stufe: 11, betrag: 4763.73 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 3, betrag: 4080.60 }, { stufe: 4, betrag: 4239.78 }, { stufe: 5, betrag: 4398.96 }, { stufe: 6, betrag: 4558.14 }, { stufe: 7, betrag: 4717.32 }, { stufe: 8, betrag: 4876.50 }, { stufe: 9, betrag: 5035.68 }, { stufe: 10, betrag: 5194.86 }, { stufe: 11, betrag: 5354.05 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 4, betrag: 4717.39 }, { stufe: 5, betrag: 4874.42 }, { stufe: 6, betrag: 5031.45 }, { stufe: 7, betrag: 5188.48 }, { stufe: 8, betrag: 5345.51 }, { stufe: 9, betrag: 5502.54 }, { stufe: 10, betrag: 5659.57 }, { stufe: 11, betrag: 5816.60 }, { stufe: 12, betrag: 5973.62 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 5, betrag: 5321.28 }, { stufe: 6, betrag: 5503.05 }, { stufe: 7, betrag: 5684.82 }, { stufe: 8, betrag: 5866.59 }, { stufe: 9, betrag: 6048.36 }, { stufe: 10, betrag: 6230.13 }, { stufe: 11, betrag: 6411.90 }, { stufe: 12, betrag: 6593.67 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 5, betrag: 5954.64 }, { stufe: 6, betrag: 6151.29 }, { stufe: 7, betrag: 6347.94 }, { stufe: 8, betrag: 6544.59 }, { stufe: 9, betrag: 6741.24 }, { stufe: 10, betrag: 6937.89 }, { stufe: 11, betrag: 7134.54 }, { stufe: 12, betrag: 7331.17 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 5, betrag: 6330.43 }, { stufe: 6, betrag: 6585.75 }, { stufe: 7, betrag: 6841.07 }, { stufe: 8, betrag: 7096.39 }, { stufe: 9, betrag: 7351.71 }, { stufe: 10, betrag: 7607.03 }, { stufe: 11, betrag: 7862.35 }, { stufe: 12, betrag: 8117.65 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 7, betrag: 7692.88 }, { stufe: 8, betrag: 7988.12 }, { stufe: 9, betrag: 8283.36 }, { stufe: 10, betrag: 8578.60 }, { stufe: 11, betrag: 8873.84 }, { stufe: 12, betrag: 9169.08 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 7, betrag: 8507.64 }, { stufe: 8, betrag: 8849.66 }, { stufe: 9, betrag: 9191.68 }, { stufe: 10, betrag: 9533.70 }, { stufe: 11, betrag: 9875.72 }, { stufe: 12, betrag: 10217.72 }] },
    ],
  },
  {
    code: "hb",
    name: "Bremen",
    verfuegbar: true,
    gueltigAb: "2025-02-01",
    entwurf: false,
    familienzuschlag: {
      gueltigAb: "2025-02-01",
      posten: [{ label: "Stufe 1 (A 5–A 8)", betrag: 157.44 }, { label: "Stufe 1 (übrige Besoldungsgruppen)", betrag: 165.40 }, { label: "Stufe 2 (A 5–A 8)", betrag: 409.37 }, { label: "Stufe 2 (übrige Besoldungsgruppen)", betrag: 417.33 }, { label: "Erhöhung für das zweite Kind", betrag: 251.93 }, { label: "Erhöhung für das dritte Kind", betrag: 578.66 }, { label: "Erhöhung ab dem vierten Kind (je Kind)", betrag: 556.54 }],
    },
    anwaerter: {
      gueltigAb: "2025-02-01",
      posten: [{ label: "A 6 bis A 8", betrag: 1457.11 }, { label: "A 9 bis A 11", betrag: 1513.45 }, { label: "A 12", betrag: 1659.25 }, { label: "A 13", betrag: 1692.41 }, { label: "A 13 + Zulage bzw. R 1", betrag: 1728.85 }],
    },
    gruppen: [
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 2, betrag: 2792.99 }, { stufe: 3, betrag: 2856.74 }, { stufe: 4, betrag: 2920.44 }, { stufe: 5, betrag: 2984.18 }, { stufe: 6, betrag: 3047.89 }, { stufe: 7, betrag: 3111.62 }, { stufe: 8, betrag: 3175.37 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 2, betrag: 2834.81 }, { stufe: 3, betrag: 2904.77 }, { stufe: 4, betrag: 2974.74 }, { stufe: 5, betrag: 3044.71 }, { stufe: 6, betrag: 3114.69 }, { stufe: 7, betrag: 3184.68 }, { stufe: 8, betrag: 3254.65 }, { stufe: 9, betrag: 3324.62 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 2, betrag: 2930.00 }, { stufe: 3, betrag: 3018.06 }, { stufe: 4, betrag: 3106.09 }, { stufe: 5, betrag: 3194.14 }, { stufe: 6, betrag: 3282.18 }, { stufe: 7, betrag: 3370.27 }, { stufe: 8, betrag: 3433.12 }, { stufe: 9, betrag: 3496.02 }, { stufe: 10, betrag: 3558.91 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 2, betrag: 3019.35 }, { stufe: 3, betrag: 3094.55 }, { stufe: 4, betrag: 3207.41 }, { stufe: 5, betrag: 3320.25 }, { stufe: 6, betrag: 3433.07 }, { stufe: 7, betrag: 3545.96 }, { stufe: 8, betrag: 3621.16 }, { stufe: 9, betrag: 3696.35 }, { stufe: 10, betrag: 3771.61 }, { stufe: 11, betrag: 3846.80 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 2, betrag: 3188.26 }, { stufe: 3, betrag: 3262.28 }, { stufe: 4, betrag: 3382.71 }, { stufe: 5, betrag: 3503.14 }, { stufe: 6, betrag: 3623.55 }, { stufe: 7, betrag: 3744.01 }, { stufe: 8, betrag: 3826.77 }, { stufe: 9, betrag: 3909.58 }, { stufe: 10, betrag: 3992.37 }, { stufe: 11, betrag: 4075.17 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 2, betrag: 3401.48 }, { stufe: 3, betrag: 3504.34 }, { stufe: 4, betrag: 3658.60 }, { stufe: 5, betrag: 3812.94 }, { stufe: 6, betrag: 3967.25 }, { stufe: 7, betrag: 4121.52 }, { stufe: 8, betrag: 4224.40 }, { stufe: 9, betrag: 4327.93 }, { stufe: 10, betrag: 4433.13 }, { stufe: 11, betrag: 4538.37 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 3, betrag: 3853.40 }, { stufe: 4, betrag: 4007.52 }, { stufe: 5, betrag: 4161.67 }, { stufe: 6, betrag: 4316.18 }, { stufe: 7, betrag: 4473.87 }, { stufe: 8, betrag: 4578.96 }, { stufe: 9, betrag: 4684.09 }, { stufe: 10, betrag: 4789.21 }, { stufe: 11, betrag: 4896.31 }, { stufe: 12, betrag: 5003.54 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 4, betrag: 4288.51 }, { stufe: 5, betrag: 4476.27 }, { stufe: 6, betrag: 4664.26 }, { stufe: 7, betrag: 4853.38 }, { stufe: 8, betrag: 4981.21 }, { stufe: 9, betrag: 5109.03 }, { stufe: 10, betrag: 5236.86 }, { stufe: 11, betrag: 5364.68 }, { stufe: 12, betrag: 5492.51 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 5, betrag: 4970.00 }, { stufe: 6, betrag: 5177.06 }, { stufe: 7, betrag: 5384.09 }, { stufe: 8, betrag: 5522.14 }, { stufe: 9, betrag: 5660.17 }, { stufe: 10, betrag: 5798.19 }, { stufe: 11, betrag: 5936.26 }, { stufe: 12, betrag: 6074.29 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 5, betrag: 5264.45 }, { stufe: 6, betrag: 5532.94 }, { stufe: 7, betrag: 5801.41 }, { stufe: 8, betrag: 5980.41 }, { stufe: 9, betrag: 6159.44 }, { stufe: 10, betrag: 6338.43 }, { stufe: 11, betrag: 6517.43 }, { stufe: 12, betrag: 6696.44 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 6, betrag: 6049.74 }, { stufe: 7, betrag: 6344.96 }, { stufe: 8, betrag: 6581.11 }, { stufe: 9, betrag: 6817.27 }, { stufe: 10, betrag: 7053.44 }, { stufe: 11, betrag: 7289.62 }, { stufe: 12, betrag: 7525.79 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 6, betrag: 6645.40 }, { stufe: 7, betrag: 6986.79 }, { stufe: 8, betrag: 7259.97 }, { stufe: 9, betrag: 7533.09 }, { stufe: 10, betrag: 7806.18 }, { stufe: 11, betrag: 8079.34 }, { stufe: 12, betrag: 8352.46 }] },
    ],
  },
  {
    code: "hh",
    name: "Hamburg",
    verfuegbar: true,
    gueltigAb: "2026-04-01",
    entwurf: true,
    familienzuschlag: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "Stufe 1 (verheiratet)", betrag: 165.84 }, { label: "Stufe 2 (mit einem Kind)", betrag: 358.98 }, { label: "Stufe 3 (mit zwei Kindern)", betrag: 552.12 }, { label: "Stufe 4 (mit drei Kindern)", betrag: 1187.12 }, { label: "Erhöhung ab dem vierten Kind (je Kind)", betrag: 635.00 }],
    },
    anwaerter: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "A 4", betrag: 1430.55 }, { label: "A 5 bis A 8", betrag: 1556.18 }, { label: "A 9 bis A 11", betrag: 1612.33 }, { label: "A 13", betrag: 1827.17 }],
    },
    gruppen: [
      { gruppe: "A4", label: "A 4", stufen: [{ stufe: 1, betrag: 2966.35 }, { stufe: 2, betrag: 3029.18 }, { stufe: 3, betrag: 3091.92 }, { stufe: 4, betrag: 3154.84 }, { stufe: 5, betrag: 3210.79 }, { stufe: 6, betrag: 3245.47 }, { stufe: 7, betrag: 3269.69 }, { stufe: 8, betrag: 3273.50 }] },
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 1, betrag: 2997.10 }, { stufe: 2, betrag: 3064.01 }, { stufe: 3, betrag: 3130.57 }, { stufe: 4, betrag: 3197.56 }, { stufe: 5, betrag: 3264.18 }, { stufe: 6, betrag: 3330.97 }, { stufe: 7, betrag: 3357.62 }, { stufe: 8, betrag: 3369.50 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 1, betrag: 3038.58 }, { stufe: 2, betrag: 3118.70 }, { stufe: 3, betrag: 3197.56 }, { stufe: 4, betrag: 3269.69 }, { stufe: 5, betrag: 3341.68 }, { stufe: 6, betrag: 3413.87 }, { stufe: 7, betrag: 3485.96 }, { stufe: 8, betrag: 3515.19 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 1, betrag: 3142.70 }, { stufe: 2, betrag: 3233.36 }, { stufe: 3, betrag: 3324.41 }, { stufe: 4, betrag: 3414.96 }, { stufe: 5, betrag: 3505.95 }, { stufe: 6, betrag: 3596.83 }, { stufe: 7, betrag: 3682.33 }, { stufe: 8, betrag: 3745.84 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 1, betrag: 3296.37 }, { stufe: 2, betrag: 3404.56 }, { stufe: 3, betrag: 3512.51 }, { stufe: 4, betrag: 3621.91 }, { stufe: 5, betrag: 3733.15 }, { stufe: 6, betrag: 3837.45 }, { stufe: 7, betrag: 3941.93 }, { stufe: 8, betrag: 4034.97 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 1, betrag: 3422.56 }, { stufe: 2, betrag: 3536.01 }, { stufe: 3, betrag: 3649.48 }, { stufe: 4, betrag: 3768.46 }, { stufe: 5, betrag: 3887.84 }, { stufe: 6, betrag: 4004.56 }, { stufe: 7, betrag: 4121.10 }, { stufe: 8, betrag: 4219.43 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 1, betrag: 3637.46 }, { stufe: 2, betrag: 3794.53 }, { stufe: 3, betrag: 3952.18 }, { stufe: 4, betrag: 4111.63 }, { stufe: 5, betrag: 4253.89 }, { stufe: 6, betrag: 4405.75 }, { stufe: 7, betrag: 4560.48 }, { stufe: 8, betrag: 4681.13 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 1, betrag: 4103.20 }, { stufe: 2, betrag: 4241.29 }, { stufe: 3, betrag: 4395.70 }, { stufe: 4, betrag: 4553.27 }, { stufe: 5, betrag: 4710.85 }, { stufe: 6, betrag: 4868.41 }, { stufe: 7, betrag: 5025.98 }, { stufe: 8, betrag: 5184.50 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 1, betrag: 4563.33 }, { stufe: 2, betrag: 4725.17 }, { stufe: 3, betrag: 4887.06 }, { stufe: 4, betrag: 5048.90 }, { stufe: 5, betrag: 5210.79 }, { stufe: 6, betrag: 5372.67 }, { stufe: 7, betrag: 5534.53 }, { stufe: 8, betrag: 5687.89 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 1, betrag: 5077.54 }, { stufe: 2, betrag: 5250.90 }, { stufe: 3, betrag: 5424.25 }, { stufe: 4, betrag: 5597.56 }, { stufe: 5, betrag: 5770.89 }, { stufe: 6, betrag: 5944.24 }, { stufe: 7, betrag: 6117.56 }, { stufe: 8, betrag: 6286.76 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 1, betrag: 5328.25 }, { stufe: 2, betrag: 5561.75 }, { stufe: 3, betrag: 5795.25 }, { stufe: 4, betrag: 6028.75 }, { stufe: 5, betrag: 6262.23 }, { stufe: 6, betrag: 6495.75 }, { stufe: 7, betrag: 6729.24 }, { stufe: 8, betrag: 6927.23 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 1, betrag: 6441.31 }, { stufe: 2, betrag: 6649.03 }, { stufe: 3, betrag: 6856.74 }, { stufe: 4, betrag: 7051.56 }, { stufe: 5, betrag: 7246.36 }, { stufe: 6, betrag: 7441.18 }, { stufe: 7, betrag: 7636.00 }, { stufe: 8, betrag: 7780.91 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 1, betrag: 7073.04 }, { stufe: 2, betrag: 7315.13 }, { stufe: 3, betrag: 7557.22 }, { stufe: 4, betrag: 7785.00 }, { stufe: 5, betrag: 8012.76 }, { stufe: 6, betrag: 8240.51 }, { stufe: 7, betrag: 8468.29 }, { stufe: 8, betrag: 8631.97 }] },
    ],
  },
  {
    code: "he",
    name: "Hessen",
    verfuegbar: true,
    gueltigAb: "2026-07-01",
    entwurf: true,
    familienzuschlag: {
      gueltigAb: "2026-07-01",
      posten: [{ label: "Stufe 1", betrag: 177.30 }, { label: "Stufe 2", betrag: 537.87 }, { label: "Stufe 3", betrag: 898.44 }, { label: "Stufe 4", betrag: 1729.52 }, { label: "Kinderbezogener Anteil – 1. und 2. Kind (je Kind)", betrag: 360.57 }, { label: "Kinderbezogener Anteil – ab 3. Kind (je Kind)", betrag: 831.08 }],
    },
    anwaerter: {
      gueltigAb: "2026-07-01",
      posten: [{ label: "A 6 bis A 8", betrag: 1561.14 }, { label: "A 9 bis A 11", betrag: 1634.81 }, { label: "A 12", betrag: 1825.54 }, { label: "A 13", betrag: 1868.96 }, { label: "A 13 + Zulage", betrag: 1916.59 }],
    },
    gruppen: [
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 2, betrag: 2974.77 }, { stufe: 3, betrag: 3039.79 }, { stufe: 4, betrag: 3120.00 }, { stufe: 5, betrag: 3203.00 }, { stufe: 6, betrag: 3283.20 }, { stufe: 7, betrag: 3373.10 }, { stufe: 8, betrag: 3449.20 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 2, betrag: 3077.11 }, { stufe: 3, betrag: 3157.37 }, { stufe: 4, betrag: 3281.84 }, { stufe: 5, betrag: 3403.55 }, { stufe: 6, betrag: 3525.27 }, { stufe: 7, betrag: 3616.56 }, { stufe: 8, betrag: 3709.25 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 2, betrag: 3268.01 }, { stufe: 3, betrag: 3380.01 }, { stufe: 4, betrag: 3537.73 }, { stufe: 5, betrag: 3693.99 }, { stufe: 6, betrag: 3807.66 }, { stufe: 7, betrag: 3921.63 }, { stufe: 8, betrag: 4035.65 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 2, betrag: 3456.11 }, { stufe: 3, betrag: 3580.59 }, { stufe: 4, betrag: 3756.37 }, { stufe: 5, betrag: 3918.80 }, { stufe: 6, betrag: 4054.17 }, { stufe: 7, betrag: 4176.70 }, { stufe: 8, betrag: 4295.01 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 2, betrag: 3685.70 }, { stufe: 3, betrag: 3907.41 }, { stufe: 4, betrag: 4129.69 }, { stufe: 5, betrag: 4347.68 }, { stufe: 6, betrag: 4507.30 }, { stufe: 7, betrag: 4661.18 }, { stufe: 8, betrag: 4816.50 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 2, betrag: 4273.62 }, { stufe: 3, betrag: 4501.58 }, { stufe: 4, betrag: 4732.43 }, { stufe: 5, betrag: 4883.49 }, { stufe: 6, betrag: 5047.65 }, { stufe: 7, betrag: 5207.42 }, { stufe: 8, betrag: 5368.26 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 2, betrag: 4609.91 }, { stufe: 3, betrag: 4883.49 }, { stufe: 4, betrag: 5157.05 }, { stufe: 5, betrag: 5341.84 }, { stufe: 6, betrag: 5541.47 }, { stufe: 7, betrag: 5735.26 }, { stufe: 8, betrag: 5931.97 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 2, betrag: 5353.60 }, { stufe: 3, betrag: 5616.35 }, { stufe: 4, betrag: 5879.09 }, { stufe: 5, betrag: 6061.11 }, { stufe: 6, betrag: 6243.16 }, { stufe: 7, betrag: 6425.17 }, { stufe: 8, betrag: 6602.82 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 2, betrag: 5700.05 }, { stufe: 3, betrag: 6042.07 }, { stufe: 4, betrag: 6381.14 }, { stufe: 5, betrag: 6614.57 }, { stufe: 6, betrag: 6850.87 }, { stufe: 7, betrag: 7084.28 }, { stufe: 8, betrag: 7320.65 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 2, betrag: 6880.24 }, { stufe: 3, betrag: 7113.64 }, { stufe: 4, betrag: 7348.54 }, { stufe: 5, betrag: 7581.94 }, { stufe: 6, betrag: 7813.85 }, { stufe: 7, betrag: 8045.81 }, { stufe: 8, betrag: 8276.28 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 2, betrag: 7617.15 }, { stufe: 3, betrag: 7885.81 }, { stufe: 4, betrag: 8155.88 }, { stufe: 5, betrag: 8423.08 }, { stufe: 6, betrag: 8694.63 }, { stufe: 7, betrag: 8963.28 }, { stufe: 8, betrag: 9228.96 }] },
    ],
  },
  {
    code: "mv",
    name: "Mecklenburg-Vorpommern",
    verfuegbar: true,
    gueltigAb: "2026-04-01",
    entwurf: false,
    familienzuschlag: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "Stufe 1", betrag: 164.77 }, { label: "Stufe 2", betrag: 363.60 }, { label: "Erhöhung für das zweite Kind", betrag: 198.83 }, { label: "Erhöhung ab dem dritten Kind (je Kind)", betrag: 820.00 }],
    },
    anwaerter: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "A 4", betrag: 1413.13 }, { label: "A 5 bis A 8", betrag: 1538.54 }, { label: "A 9 bis A 11", betrag: 1594.62 }, { label: "A 12", betrag: 1739.79 }, { label: "A 13", betrag: 1772.80 }, { label: "A 13 + Strukturzulage bzw. R 1", betrag: 1809.08 }],
    },
    gruppen: [
      { gruppe: "A4", label: "A 4", stufen: [{ stufe: 1, betrag: 2818.06 }, { stufe: 2, betrag: 2857.47 }, { stufe: 3, betrag: 2895.58 }, { stufe: 4, betrag: 2932.49 }, { stufe: 5, betrag: 2994.93 }, { stufe: 6, betrag: 3057.42 }, { stufe: 7, betrag: 3119.86 }] },
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 1, betrag: 2836.37 }, { stufe: 2, betrag: 2893.44 }, { stufe: 3, betrag: 2930.90 }, { stufe: 4, betrag: 2967.10 }, { stufe: 5, betrag: 3029.25 }, { stufe: 6, betrag: 3091.42 }, { stufe: 7, betrag: 3153.56 }, { stufe: 8, betrag: 3215.74 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 1, betrag: 2890.48 }, { stufe: 2, betrag: 2935.03 }, { stufe: 3, betrag: 2978.20 }, { stufe: 4, betrag: 3020.05 }, { stufe: 5, betrag: 3088.31 }, { stufe: 6, betrag: 3156.55 }, { stufe: 7, betrag: 3224.79 }, { stufe: 8, betrag: 3293.04 }, { stufe: 9, betrag: 3361.27 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 1, betrag: 2993.21 }, { stufe: 2, betrag: 3029.72 }, { stufe: 3, betrag: 3089.81 }, { stufe: 4, betrag: 3148.15 }, { stufe: 5, betrag: 3234.06 }, { stufe: 6, betrag: 3319.90 }, { stufe: 7, betrag: 3405.81 }, { stufe: 8, betrag: 3467.10 }, { stufe: 9, betrag: 3528.44 }, { stufe: 10, betrag: 3589.79 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 2, betrag: 3146.15 }, { stufe: 3, betrag: 3193.45 }, { stufe: 4, betrag: 3276.31 }, { stufe: 5, betrag: 3357.01 }, { stufe: 6, betrag: 3467.04 }, { stufe: 7, betrag: 3577.12 }, { stufe: 8, betrag: 3650.47 }, { stufe: 9, betrag: 3725.30 }, { stufe: 10, betrag: 3800.73 }, { stufe: 11, betrag: 3876.14 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 2, betrag: 3315.82 }, { stufe: 3, betrag: 3360.27 }, { stufe: 4, betrag: 3448.99 }, { stufe: 5, betrag: 3535.36 }, { stufe: 6, betrag: 3652.83 }, { stufe: 7, betrag: 3773.05 }, { stufe: 8, betrag: 3856.02 }, { stufe: 9, betrag: 3939.08 }, { stufe: 10, betrag: 4022.05 }, { stufe: 11, betrag: 4105.06 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 2, betrag: 3530.01 }, { stufe: 3, betrag: 3601.07 }, { stufe: 4, betrag: 3722.13 }, { stufe: 5, betrag: 3842.20 }, { stufe: 6, betrag: 3996.87 }, { stufe: 7, betrag: 4151.58 }, { stufe: 8, betrag: 4254.69 }, { stufe: 9, betrag: 4357.96 }, { stufe: 10, betrag: 4463.13 }, { stufe: 11, betrag: 4568.33 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 3, betrag: 3993.61 }, { stufe: 4, betrag: 4118.60 }, { stufe: 5, betrag: 4240.43 }, { stufe: 6, betrag: 4359.30 }, { stufe: 7, betrag: 4520.99 }, { stufe: 8, betrag: 4628.76 }, { stufe: 9, betrag: 4736.54 }, { stufe: 10, betrag: 4844.46 }, { stufe: 11, betrag: 4954.13 }, { stufe: 12, betrag: 5063.81 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 3, betrag: 4259.87 }, { stufe: 4, betrag: 4413.35 }, { stufe: 5, betrag: 4566.52 }, { stufe: 6, betrag: 4716.21 }, { stufe: 7, betrag: 4910.22 }, { stufe: 8, betrag: 5040.95 }, { stufe: 9, betrag: 5171.71 }, { stufe: 10, betrag: 5302.47 }, { stufe: 11, betrag: 5433.22 }, { stufe: 12, betrag: 5563.96 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 4, betrag: 4956.08 }, { stufe: 5, betrag: 5125.73 }, { stufe: 6, betrag: 5291.53 }, { stufe: 7, betrag: 5453.06 }, { stufe: 8, betrag: 5594.26 }, { stufe: 9, betrag: 5735.45 }, { stufe: 10, betrag: 5876.64 }, { stufe: 11, betrag: 6017.86 }, { stufe: 12, betrag: 6159.05 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 4, betrag: 5201.23 }, { stufe: 5, betrag: 5432.94 }, { stufe: 6, betrag: 5659.20 }, { stufe: 7, betrag: 5879.94 }, { stufe: 8, betrag: 6063.04 }, { stufe: 9, betrag: 6246.14 }, { stufe: 10, betrag: 6429.24 }, { stufe: 11, betrag: 6612.34 }, { stufe: 12, betrag: 6795.44 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 6, betrag: 6311.46 }, { stufe: 7, betrag: 6560.26 }, { stufe: 8, betrag: 6742.08 }, { stufe: 9, betrag: 6919.03 }, { stufe: 10, betrag: 7160.64 }, { stufe: 11, betrag: 7402.17 }, { stufe: 12, betrag: 7643.77 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 6, betrag: 6939.01 }, { stufe: 7, betrag: 7229.93 }, { stufe: 8, betrag: 7443.37 }, { stufe: 9, betrag: 7651.22 }, { stufe: 10, betrag: 7930.59 }, { stufe: 11, betrag: 8209.99 }, { stufe: 12, betrag: 8489.37 }] },
    ],
  },
  {
    code: "ni",
    name: "Niedersachsen",
    verfuegbar: true,
    gueltigAb: "2026-04-01",
    entwurf: false,
    familienzuschlag: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "Stufe 1 (A 5–A 8)", betrag: 162.26 }, { label: "Stufe 1 (übrige Besoldungsgruppen)", betrag: 170.36 }, { label: "Stufe 2 (A 5–A 8)", betrag: 307.87 }, { label: "Stufe 2 (übrige Besoldungsgruppen)", betrag: 315.97 }, { label: "Erhöhung für das zweite Kind", betrag: 145.61 }, { label: "Erhöhung ab dem dritten Kind (je Kind)", betrag: 512.37 }],
    },
    anwaerter: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "A 5 bis A 8", betrag: 1469.04 }, { label: "A 9 bis A 11", betrag: 1529.74 }, { label: "A 12", betrag: 1686.91 }, { label: "A 13", betrag: 1722.66 }, { label: "A 13 + Zulage", betrag: 1761.92 }],
    },
    gruppen: [
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 2, betrag: 2891.00 }, { stufe: 3, betrag: 2954.04 }, { stufe: 4, betrag: 3017.06 }, { stufe: 5, betrag: 3080.11 }, { stufe: 6, betrag: 3143.16 }, { stufe: 7, betrag: 3206.20 }, { stufe: 8, betrag: 3269.24 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 2, betrag: 2932.36 }, { stufe: 3, betrag: 3001.57 }, { stufe: 4, betrag: 3070.77 }, { stufe: 5, betrag: 3139.98 }, { stufe: 6, betrag: 3209.22 }, { stufe: 7, betrag: 3278.44 }, { stufe: 8, betrag: 3347.66 }, { stufe: 9, betrag: 3416.86 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 2, betrag: 3026.51 }, { stufe: 3, betrag: 3113.62 }, { stufe: 4, betrag: 3200.70 }, { stufe: 5, betrag: 3287.81 }, { stufe: 6, betrag: 3374.89 }, { stufe: 7, betrag: 3462.02 }, { stufe: 8, betrag: 3524.21 }, { stufe: 9, betrag: 3586.41 }, { stufe: 10, betrag: 3648.65 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 2, betrag: 3114.88 }, { stufe: 3, betrag: 3189.31 }, { stufe: 4, betrag: 3300.92 }, { stufe: 5, betrag: 3412.53 }, { stufe: 6, betrag: 3524.15 }, { stufe: 7, betrag: 3635.81 }, { stufe: 8, betrag: 3711.30 }, { stufe: 9, betrag: 3787.76 }, { stufe: 10, betrag: 3864.27 }, { stufe: 11, betrag: 3940.76 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 2, betrag: 3281.97 }, { stufe: 3, betrag: 3355.18 }, { stufe: 4, betrag: 3474.31 }, { stufe: 5, betrag: 3593.44 }, { stufe: 6, betrag: 3713.72 }, { stufe: 7, betrag: 3836.20 }, { stufe: 8, betrag: 3920.35 }, { stufe: 9, betrag: 4004.88 }, { stufe: 10, betrag: 4093.20 }, { stufe: 11, betrag: 4182.22 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 2, betrag: 3492.91 }, { stufe: 3, betrag: 3594.66 }, { stufe: 4, betrag: 3749.39 }, { stufe: 5, betrag: 3906.32 }, { stufe: 6, betrag: 4066.21 }, { stufe: 7, betrag: 4232.10 }, { stufe: 8, betrag: 4342.70 }, { stufe: 9, betrag: 4453.31 }, { stufe: 10, betrag: 4563.89 }, { stufe: 11, betrag: 4674.50 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 3, betrag: 3948.33 }, { stufe: 4, betrag: 4114.71 }, { stufe: 5, betrag: 4284.69 }, { stufe: 6, betrag: 4454.71 }, { stufe: 7, betrag: 4624.69 }, { stufe: 8, betrag: 4738.08 }, { stufe: 9, betrag: 4851.37 }, { stufe: 10, betrag: 4964.74 }, { stufe: 11, betrag: 5078.04 }, { stufe: 12, betrag: 5191.36 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 4, betrag: 4424.66 }, { stufe: 5, betrag: 4627.27 }, { stufe: 6, betrag: 4829.99 }, { stufe: 7, betrag: 5032.67 }, { stufe: 8, betrag: 5167.79 }, { stufe: 9, betrag: 5302.87 }, { stufe: 10, betrag: 5438.01 }, { stufe: 11, betrag: 5573.12 }, { stufe: 12, betrag: 5708.25 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 4, betrag: 4937.05 }, { stufe: 5, betrag: 5155.93 }, { stufe: 6, betrag: 5374.78 }, { stufe: 7, betrag: 5593.61 }, { stufe: 8, betrag: 5739.55 }, { stufe: 9, betrag: 5885.46 }, { stufe: 10, betrag: 6031.37 }, { stufe: 11, betrag: 6177.28 }, { stufe: 12, betrag: 6323.19 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 4, betrag: 5183.35 }, { stufe: 5, betrag: 5467.14 }, { stufe: 6, betrag: 5750.94 }, { stufe: 7, betrag: 6034.76 }, { stufe: 8, betrag: 6223.96 }, { stufe: 9, betrag: 6413.18 }, { stufe: 10, betrag: 6602.35 }, { stufe: 11, betrag: 6791.58 }, { stufe: 12, betrag: 6980.82 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 6, betrag: 6297.25 }, { stufe: 7, betrag: 6609.25 }, { stufe: 8, betrag: 6858.91 }, { stufe: 9, betrag: 7108.52 }, { stufe: 10, betrag: 7358.17 }, { stufe: 11, betrag: 7607.81 }, { stufe: 12, betrag: 7857.43 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 6, betrag: 6926.84 }, { stufe: 7, betrag: 7287.70 }, { stufe: 8, betrag: 7576.43 }, { stufe: 9, betrag: 7865.15 }, { stufe: 10, betrag: 8153.86 }, { stufe: 11, betrag: 8442.53 }, { stufe: 12, betrag: 8731.23 }] },
    ],
  },
  {
    code: "nrw",
    name: "Nordrhein-Westfalen",
    verfuegbar: true,
    gueltigAb: "2026-04-01",
    entwurf: true,
    familienzuschlag: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "Stufe 1 – Besoldungsgruppen A 5 und A 6", betrag: 169.26 }, { label: "Stufe 1 – Besoldungsgruppen A 7 und A 8", betrag: 167.26 }, { label: "Stufe 1 – übrige Besoldungsgruppen", betrag: 173.50 }],
      hinweis: "Ab dem zweiten Kind richtet sich der Familienzuschlag zusätzlich nach der regionalen Mietenstufe (I–VII) der Wohngemeinde; Details auf Anfrage.",
    },
    anwaerter: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "A 5 bis A 8", betrag: 1559.78 }, { label: "A 9 bis A 11", betrag: 1615.68 }, { label: "A 12", betrag: 1760.37 }, { label: "A 13", betrag: 1793.28 }, { label: "A 13 + Zulage nach § 47 Buchst. d", betrag: 1829.43 }],
    },
    gruppen: [
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 3, betrag: 3076.37 }, { stufe: 4, betrag: 3145.21 }, { stufe: 5, betrag: 3214.05 }, { stufe: 6, betrag: 3282.90 }, { stufe: 7, betrag: 3351.75 }, { stufe: 8, betrag: 3420.60 }, { stufe: 9, betrag: 3489.46 }, { stufe: 10, betrag: 3558.32 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 3, betrag: 3128.27 }, { stufe: 4, betrag: 3203.86 }, { stufe: 5, betrag: 3279.46 }, { stufe: 6, betrag: 3355.07 }, { stufe: 7, betrag: 3430.67 }, { stufe: 8, betrag: 3506.25 }, { stufe: 9, betrag: 3581.84 }, { stufe: 10, betrag: 3657.40 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 3, betrag: 3215.64 }, { stufe: 4, betrag: 3309.66 }, { stufe: 5, betrag: 3403.66 }, { stufe: 6, betrag: 3497.60 }, { stufe: 7, betrag: 3591.62 }, { stufe: 8, betrag: 3658.72 }, { stufe: 9, betrag: 3725.87 }, { stufe: 10, betrag: 3793.02 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 3, betrag: 3297.34 }, { stufe: 4, betrag: 3417.78 }, { stufe: 5, betrag: 3538.22 }, { stufe: 6, betrag: 3658.68 }, { stufe: 7, betrag: 3779.14 }, { stufe: 8, betrag: 3859.42 }, { stufe: 9, betrag: 3939.72 }, { stufe: 10, betrag: 4020.04 }, { stufe: 11, betrag: 4100.31 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 3, betrag: 3438.22 }, { stufe: 4, betrag: 3565.23 }, { stufe: 5, betrag: 3692.22 }, { stufe: 6, betrag: 3819.22 }, { stufe: 7, betrag: 3946.23 }, { stufe: 8, betrag: 4033.49 }, { stufe: 9, betrag: 4120.87 }, { stufe: 10, betrag: 4208.16 }, { stufe: 11, betrag: 4295.45 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 3, betrag: 3693.51 }, { stufe: 4, betrag: 3856.20 }, { stufe: 5, betrag: 4018.94 }, { stufe: 6, betrag: 4181.64 }, { stufe: 7, betrag: 4344.38 }, { stufe: 8, betrag: 4452.85 }, { stufe: 9, betrag: 4561.86 }, { stufe: 10, betrag: 4672.80 }, { stufe: 11, betrag: 4783.77 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 3, betrag: 4047.72 }, { stufe: 4, betrag: 4209.60 }, { stufe: 5, betrag: 4371.53 }, { stufe: 6, betrag: 4533.45 }, { stufe: 7, betrag: 4698.97 }, { stufe: 8, betrag: 4809.35 }, { stufe: 9, betrag: 4919.78 }, { stufe: 10, betrag: 5031.72 }, { stufe: 11, betrag: 5144.33 }, { stufe: 12, betrag: 5256.99 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 4, betrag: 4504.78 }, { stufe: 5, betrag: 4701.47 }, { stufe: 6, betrag: 4898.95 }, { stufe: 7, betrag: 5099.22 }, { stufe: 8, betrag: 5233.52 }, { stufe: 9, betrag: 5367.79 }, { stufe: 10, betrag: 5502.12 }, { stufe: 11, betrag: 5636.43 }, { stufe: 12, betrag: 5770.65 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 5, betrag: 5221.48 }, { stufe: 6, betrag: 5438.95 }, { stufe: 7, betrag: 5656.44 }, { stufe: 8, betrag: 5801.45 }, { stufe: 9, betrag: 5946.45 }, { stufe: 10, betrag: 6091.47 }, { stufe: 11, betrag: 6236.50 }, { stufe: 12, betrag: 6381.49 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 5, betrag: 5530.75 }, { stufe: 6, betrag: 5812.82 }, { stufe: 7, betrag: 6094.83 }, { stufe: 8, betrag: 6282.88 }, { stufe: 9, betrag: 6470.89 }, { stufe: 10, betrag: 6658.95 }, { stufe: 11, betrag: 6846.99 }, { stufe: 12, betrag: 7035.03 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 6, betrag: 6355.71 }, { stufe: 7, betrag: 6665.80 }, { stufe: 8, betrag: 6913.86 }, { stufe: 9, betrag: 7161.95 }, { stufe: 10, betrag: 7410.06 }, { stufe: 11, betrag: 7658.16 }, { stufe: 12, betrag: 7906.23 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 6, betrag: 6981.43 }, { stufe: 7, betrag: 7340.03 }, { stufe: 8, betrag: 7626.98 }, { stufe: 9, betrag: 7913.91 }, { stufe: 10, betrag: 8200.79 }, { stufe: 11, betrag: 8487.74 }, { stufe: 12, betrag: 8774.66 }] },
    ],
  },
  {
    code: "rp",
    name: "Rheinland-Pfalz",
    verfuegbar: true,
    gueltigAb: "2026-04-01",
    entwurf: true,
    familienzuschlag: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "Zuschlag nach § 41 Abs. 1 Satz 1 Nr. 1", betrag: 88.03 }, { label: "Zuschlag Nr. 2 – 1. und 2. Kind (je Kind)", betrag: 246.97 }, { label: "Zuschlag Nr. 2 – ab 3. Kind (je Kind)", betrag: 726.00 }],
    },
    anwaerter: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "A 5 bis A 8", betrag: 1571.65 }, { label: "A 9 bis A 11", betrag: 1627.85 }, { label: "A 12", betrag: 1773.55 }, { label: "A 13", betrag: 1806.71 }, { label: "A 13 + Allgemeine Zulage", betrag: 1843.13 }],
    },
    gruppen: [
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 2, betrag: 3062.58 }, { stufe: 3, betrag: 3131.48 }, { stufe: 4, betrag: 3200.36 }, { stufe: 5, betrag: 3269.28 }, { stufe: 6, betrag: 3338.16 }, { stufe: 7, betrag: 3407.09 }, { stufe: 8, betrag: 3476.02 }, { stufe: 9, betrag: 3545.41 }, { stufe: 10, betrag: 3614.78 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 2, betrag: 3107.75 }, { stufe: 3, betrag: 3183.42 }, { stufe: 4, betrag: 3259.09 }, { stufe: 5, betrag: 3334.70 }, { stufe: 6, betrag: 3410.38 }, { stufe: 7, betrag: 3486.07 }, { stufe: 8, betrag: 3561.72 }, { stufe: 9, betrag: 3637.36 }, { stufe: 10, betrag: 3739.11 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 2, betrag: 3172.52 }, { stufe: 3, betrag: 3266.40 }, { stufe: 4, betrag: 3360.21 }, { stufe: 5, betrag: 3454.07 }, { stufe: 6, betrag: 3547.93 }, { stufe: 7, betrag: 3641.81 }, { stufe: 8, betrag: 3708.81 }, { stufe: 9, betrag: 3775.86 }, { stufe: 10, betrag: 3842.90 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 2, betrag: 3267.73 }, { stufe: 3, betrag: 3347.91 }, { stufe: 4, betrag: 3468.19 }, { stufe: 5, betrag: 3588.52 }, { stufe: 6, betrag: 3708.73 }, { stufe: 7, betrag: 3829.04 }, { stufe: 8, betrag: 3909.24 }, { stufe: 9, betrag: 3989.39 }, { stufe: 10, betrag: 4069.64 }, { stufe: 11, betrag: 4149.78 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 2, betrag: 3401.05 }, { stufe: 3, betrag: 3479.97 }, { stufe: 4, betrag: 3608.33 }, { stufe: 5, betrag: 3736.68 }, { stufe: 6, betrag: 3865.06 }, { stufe: 7, betrag: 3993.45 }, { stufe: 8, betrag: 4081.67 }, { stufe: 9, betrag: 4169.96 }, { stufe: 10, betrag: 4258.23 }, { stufe: 11, betrag: 4346.46 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 2, betrag: 3583.27 }, { stufe: 3, betrag: 3691.35 }, { stufe: 4, betrag: 3853.43 }, { stufe: 5, betrag: 4015.58 }, { stufe: 6, betrag: 4177.69 }, { stufe: 7, betrag: 4339.86 }, { stufe: 8, betrag: 4447.92 }, { stufe: 9, betrag: 4556.01 }, { stufe: 10, betrag: 4665.23 }, { stufe: 11, betrag: 4775.80 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 3, betrag: 4059.03 }, { stufe: 4, betrag: 4225.11 }, { stufe: 5, betrag: 4391.22 }, { stufe: 6, betrag: 4557.34 }, { stufe: 7, betrag: 4726.03 }, { stufe: 8, betrag: 4839.34 }, { stufe: 9, betrag: 4952.60 }, { stufe: 10, betrag: 5065.95 }, { stufe: 11, betrag: 5179.90 }, { stufe: 12, betrag: 5295.46 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 4, betrag: 4609.72 }, { stufe: 5, betrag: 4728.64 }, { stufe: 6, betrag: 4931.26 }, { stufe: 7, betrag: 5133.86 }, { stufe: 8, betrag: 5271.40 }, { stufe: 9, betrag: 5409.17 }, { stufe: 10, betrag: 5546.90 }, { stufe: 11, betrag: 5684.70 }, { stufe: 12, betrag: 5822.51 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 4, betrag: 5120.01 }, { stufe: 5, betrag: 5259.33 }, { stufe: 6, betrag: 5482.48 }, { stufe: 7, betrag: 5705.64 }, { stufe: 8, betrag: 5854.40 }, { stufe: 9, betrag: 6003.21 }, { stufe: 10, betrag: 6151.94 }, { stufe: 11, betrag: 6300.77 }, { stufe: 12, betrag: 6449.54 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 4, betrag: 5369.04 }, { stufe: 5, betrag: 5576.65 }, { stufe: 6, betrag: 5866.02 }, { stufe: 7, betrag: 6155.44 }, { stufe: 8, betrag: 6348.31 }, { stufe: 9, betrag: 6541.27 }, { stufe: 10, betrag: 6734.25 }, { stufe: 11, betrag: 6927.17 }, { stufe: 12, betrag: 7120.09 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 6, betrag: 6423.09 }, { stufe: 7, betrag: 6741.23 }, { stufe: 8, betrag: 6995.78 }, { stufe: 9, betrag: 7250.36 }, { stufe: 10, betrag: 7504.85 }, { stufe: 11, betrag: 7759.40 }, { stufe: 12, betrag: 8013.93 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 6, betrag: 7065.05 }, { stufe: 7, betrag: 7433.02 }, { stufe: 8, betrag: 7727.40 }, { stufe: 9, betrag: 8021.83 }, { stufe: 10, betrag: 8316.21 }, { stufe: 11, betrag: 8610.59 }, { stufe: 12, betrag: 8904.92 }] },
    ],
  },
  {
    code: "sl",
    name: "Saarland",
    verfuegbar: true,
    gueltigAb: "2026-04-01",
    entwurf: false,
    familienzuschlag: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "Stufe 1", betrag: 164.48 }, { label: "Stufe 2", betrag: 329.79 }, { label: "Erhöhung für das zweite Kind", betrag: 165.31 }, { label: "Erhöhung ab dem dritten Kind (je Kind)", betrag: 781.68 }],
    },
    anwaerter: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "A 4", betrag: 1363.45 }, { label: "A 6 bis A 8", betrag: 1483.52 }, { label: "A 9 bis A 11", betrag: 1537.21 }, { label: "A 12", betrag: 1676.20 }, { label: "A 13", betrag: 1707.82 }, { label: "A 13 + Zulage", betrag: 1742.56 }],
    },
    gruppen: [
      { gruppe: "A4", label: "A 4", stufen: [{ stufe: 1, betrag: 2878.42 }, { stufe: 2, betrag: 2911.20 }, { stufe: 3, betrag: 2942.34 }, { stufe: 4, betrag: 3005.63 }, { stufe: 5, betrag: 3068.90 }, { stufe: 6, betrag: 3132.18 }, { stufe: 7, betrag: 3195.42 }] },
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 1, betrag: 2896.86 }, { stufe: 2, betrag: 2947.38 }, { stufe: 3, betrag: 2977.77 }, { stufe: 4, betrag: 3040.71 }, { stufe: 5, betrag: 3103.65 }, { stufe: 6, betrag: 3166.61 }, { stufe: 7, betrag: 3229.55 }, { stufe: 8, betrag: 3292.49 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 1, betrag: 2951.38 }, { stufe: 2, betrag: 2989.18 }, { stufe: 3, betrag: 3025.21 }, { stufe: 4, betrag: 3094.35 }, { stufe: 5, betrag: 3163.42 }, { stufe: 6, betrag: 3232.57 }, { stufe: 7, betrag: 3301.70 }, { stufe: 8, betrag: 3370.83 }, { stufe: 9, betrag: 3439.90 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 1, betrag: 3054.96 }, { stufe: 2, betrag: 3084.41 }, { stufe: 3, betrag: 3137.13 }, { stufe: 4, betrag: 3224.10 }, { stufe: 5, betrag: 3311.04 }, { stufe: 6, betrag: 3398.00 }, { stufe: 7, betrag: 3484.99 }, { stufe: 8, betrag: 3547.10 }, { stufe: 9, betrag: 3609.24 }, { stufe: 10, betrag: 3671.35 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 2, betrag: 3173.76 }, { stufe: 3, betrag: 3212.71 }, { stufe: 4, betrag: 3324.14 }, { stufe: 5, betrag: 3435.61 }, { stufe: 6, betrag: 3547.04 }, { stufe: 7, betrag: 3658.52 }, { stufe: 8, betrag: 3734.54 }, { stufe: 9, betrag: 3810.88 }, { stufe: 10, betrag: 3887.33 }, { stufe: 11, betrag: 3963.68 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 2, betrag: 3324.03 }, { stufe: 3, betrag: 3359.94 }, { stufe: 4, betrag: 3478.90 }, { stufe: 5, betrag: 3597.83 }, { stufe: 6, betrag: 3718.07 }, { stufe: 7, betrag: 3840.36 }, { stufe: 8, betrag: 3924.41 }, { stufe: 9, betrag: 4008.48 }, { stufe: 10, betrag: 4092.53 }, { stufe: 11, betrag: 4176.61 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 2, betrag: 3537.26 }, { stufe: 3, betrag: 3599.04 }, { stufe: 4, betrag: 3753.66 }, { stufe: 5, betrag: 3910.34 }, { stufe: 6, betrag: 4067.00 }, { stufe: 7, betrag: 4223.70 }, { stufe: 8, betrag: 4328.14 }, { stufe: 9, betrag: 4433.06 }, { stufe: 10, betrag: 4539.91 }, { stufe: 11, betrag: 4646.78 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 3, betrag: 3929.40 }, { stufe: 4, betrag: 4089.89 }, { stufe: 5, betrag: 4250.40 }, { stufe: 6, betrag: 4411.01 }, { stufe: 7, betrag: 4575.25 }, { stufe: 8, betrag: 4684.71 }, { stufe: 9, betrag: 4794.21 }, { stufe: 10, betrag: 4903.71 }, { stufe: 11, betrag: 5013.21 }, { stufe: 12, betrag: 5122.67 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 3, betrag: 4191.19 }, { stufe: 4, betrag: 4382.59 }, { stufe: 5, betrag: 4577.76 }, { stufe: 6, betrag: 4773.56 }, { stufe: 7, betrag: 4969.35 }, { stufe: 8, betrag: 5099.86 }, { stufe: 9, betrag: 5230.40 }, { stufe: 10, betrag: 5360.95 }, { stufe: 11, betrag: 5491.49 }, { stufe: 12, betrag: 5622.00 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 4, betrag: 4876.99 }, { stufe: 5, betrag: 5088.45 }, { stufe: 6, betrag: 5299.84 }, { stufe: 7, betrag: 5511.30 }, { stufe: 8, betrag: 5652.23 }, { stufe: 9, betrag: 5793.24 }, { stufe: 10, betrag: 5934.16 }, { stufe: 11, betrag: 6075.18 }, { stufe: 12, betrag: 6216.13 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 4, betrag: 5114.95 }, { stufe: 5, betrag: 5389.13 }, { stufe: 6, betrag: 5663.27 }, { stufe: 7, betrag: 5937.48 }, { stufe: 8, betrag: 6120.24 }, { stufe: 9, betrag: 6303.07 }, { stufe: 10, betrag: 6485.84 }, { stufe: 11, betrag: 6668.63 }, { stufe: 12, betrag: 6851.46 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 6, betrag: 6191.06 }, { stufe: 7, betrag: 6492.50 }, { stufe: 8, betrag: 6733.66 }, { stufe: 9, betrag: 6974.81 }, { stufe: 10, betrag: 7215.98 }, { stufe: 11, betrag: 7457.14 }, { stufe: 12, betrag: 7698.32 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 6, betrag: 6799.31 }, { stufe: 7, betrag: 7147.90 }, { stufe: 8, betrag: 7426.87 }, { stufe: 9, betrag: 7705.79 }, { stufe: 10, betrag: 7984.66 }, { stufe: 11, betrag: 8263.61 }, { stufe: 12, betrag: 8542.54 }] },
    ],
  },
  {
    code: "sn",
    name: "Sachsen",
    verfuegbar: true,
    gueltigAb: "2026-04-01",
    entwurf: false,
    familienzuschlag: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "Stufe 1", betrag: 279.58 }, { label: "Stufe 2", betrag: 559.16 }, { label: "Erhöhung für das zweite Kind", betrag: 279.58 }, { label: "Erhöhung ab dem dritten Kind (je Kind)", betrag: 795.41 }],
    },
    anwaerter: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "A 5", betrag: 1464.79 }, { label: "A 6 bis A 8", betrag: 1588.41 }, { label: "A 9 bis A 11", betrag: 1643.69 }, { label: "A 12", betrag: 1786.79 }, { label: "A 13 oder R 1", betrag: 1855.10 }],
    },
    gruppen: [
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 1, betrag: 2750.79 }, { stufe: 2, betrag: 2843.22 }, { stufe: 3, betrag: 2915.03 }, { stufe: 4, betrag: 2986.80 }, { stufe: 5, betrag: 3058.63 }, { stufe: 6, betrag: 3130.41 }, { stufe: 7, betrag: 3202.21 }, { stufe: 8, betrag: 3310.72 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 1, betrag: 2837.99 }, { stufe: 2, betrag: 2916.83 }, { stufe: 3, betrag: 2995.65 }, { stufe: 4, betrag: 3074.47 }, { stufe: 5, betrag: 3153.29 }, { stufe: 6, betrag: 3232.17 }, { stufe: 7, betrag: 3311.02 }, { stufe: 8, betrag: 3389.83 }, { stufe: 9, betrag: 3507.50 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 1, betrag: 2953.25 }, { stufe: 2, betrag: 3024.10 }, { stufe: 3, betrag: 3123.31 }, { stufe: 4, betrag: 3222.49 }, { stufe: 5, betrag: 3321.69 }, { stufe: 6, betrag: 3420.90 }, { stufe: 7, betrag: 3520.09 }, { stufe: 8, betrag: 3590.93 }, { stufe: 9, betrag: 3661.78 }, { stufe: 10, betrag: 3774.48 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 2, betrag: 3124.76 }, { stufe: 3, betrag: 3209.49 }, { stufe: 4, betrag: 3336.61 }, { stufe: 5, betrag: 3463.77 }, { stufe: 6, betrag: 3590.89 }, { stufe: 7, betrag: 3718.05 }, { stufe: 8, betrag: 3802.78 }, { stufe: 9, betrag: 3887.52 }, { stufe: 10, betrag: 3972.30 }, { stufe: 11, betrag: 4102.49 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 2, betrag: 3403.76 }, { stufe: 3, betrag: 3487.15 }, { stufe: 4, betrag: 3622.81 }, { stufe: 5, betrag: 3758.48 }, { stufe: 6, betrag: 3894.23 }, { stufe: 7, betrag: 4029.89 }, { stufe: 8, betrag: 4123.15 }, { stufe: 9, betrag: 4216.45 }, { stufe: 10, betrag: 4309.72 }, { stufe: 11, betrag: 4452.28 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 2, betrag: 3644.00 }, { stufe: 3, betrag: 3759.89 }, { stufe: 4, betrag: 3933.68 }, { stufe: 5, betrag: 4107.55 }, { stufe: 6, betrag: 4281.39 }, { stufe: 7, betrag: 4455.22 }, { stufe: 8, betrag: 4572.56 }, { stufe: 9, betrag: 4691.12 }, { stufe: 10, betrag: 4809.65 }, { stufe: 11, betrag: 4983.41 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 3, betrag: 4154.09 }, { stufe: 4, betrag: 4332.24 }, { stufe: 5, betrag: 4510.39 }, { stufe: 6, betrag: 4692.62 }, { stufe: 7, betrag: 4874.84 }, { stufe: 8, betrag: 4996.31 }, { stufe: 9, betrag: 5117.79 }, { stufe: 10, betrag: 5239.31 }, { stufe: 11, betrag: 5360.80 }, { stufe: 12, betrag: 5543.65 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 3, betrag: 4444.60 }, { stufe: 4, betrag: 4660.40 }, { stufe: 5, betrag: 4877.65 }, { stufe: 6, betrag: 5094.92 }, { stufe: 7, betrag: 5312.11 }, { stufe: 8, betrag: 5456.94 }, { stufe: 9, betrag: 5601.80 }, { stufe: 10, betrag: 5746.61 }, { stufe: 11, betrag: 5891.47 }, { stufe: 12, betrag: 6103.87 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 3, betrag: 4975.10 }, { stufe: 4, betrag: 5209.67 }, { stufe: 5, betrag: 5444.24 }, { stufe: 6, betrag: 5678.83 }, { stufe: 7, betrag: 5913.46 }, { stufe: 8, betrag: 6069.85 }, { stufe: 9, betrag: 6226.25 }, { stufe: 10, betrag: 6382.61 }, { stufe: 11, betrag: 6539.05 }, { stufe: 12, betrag: 6770.46 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 3, betrag: 5051.56 }, { stufe: 4, betrag: 5355.80 }, { stufe: 5, betrag: 5660.00 }, { stufe: 6, betrag: 5964.19 }, { stufe: 7, betrag: 6268.44 }, { stufe: 8, betrag: 6471.20 }, { stufe: 9, betrag: 6674.05 }, { stufe: 10, betrag: 6876.87 }, { stufe: 11, betrag: 7079.69 }, { stufe: 12, betrag: 7364.07 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 6, betrag: 6549.74 }, { stufe: 7, betrag: 6884.22 }, { stufe: 8, betrag: 7151.83 }, { stufe: 9, betrag: 7419.42 }, { stufe: 10, betrag: 7686.98 }, { stufe: 11, betrag: 7954.57 }, { stufe: 12, betrag: 8314.24 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 6, betrag: 7224.65 }, { stufe: 7, betrag: 7611.43 }, { stufe: 8, betrag: 7920.94 }, { stufe: 9, betrag: 8230.39 }, { stufe: 10, betrag: 8539.84 }, { stufe: 11, betrag: 8849.37 }, { stufe: 12, betrag: 9261.41 }] },
    ],
  },
  {
    code: "st",
    name: "Sachsen-Anhalt",
    verfuegbar: true,
    gueltigAb: "2026-04-01",
    entwurf: false,
    familienzuschlag: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "Stufe 1", betrag: 169.04 }, { label: "Stufe 2 (ein Kind)", betrag: 353.89 }, { label: "Erhöhung für das zweite Kind", betrag: 353.89 }, { label: "Erhöhung ab dem dritten Kind (je Kind)", betrag: 818.98 }],
    },
    anwaerter: {
      gueltigAb: "2026-04-01",
      posten: [{ label: "A 5 bis A 8", betrag: 1518.94 }, { label: "A 9 bis A 11", betrag: 1572.82 }, { label: "A 12", betrag: 1712.28 }, { label: "A 13", betrag: 1744.00 }, { label: "A 13 + Zulage", betrag: 1778.85 }],
    },
    gruppen: [
      { gruppe: "A5", label: "A 5", stufen: [{ stufe: 1, betrag: 2817.70 }, { stufe: 2, betrag: 2901.95 }, { stufe: 3, betrag: 2967.44 }, { stufe: 4, betrag: 3032.89 }, { stufe: 5, betrag: 3098.38 }, { stufe: 6, betrag: 3163.84 }, { stufe: 7, betrag: 3229.31 }, { stufe: 8, betrag: 3294.81 }] },
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 1, betrag: 2873.01 }, { stufe: 2, betrag: 2967.72 }, { stufe: 3, betrag: 3064.06 }, { stufe: 4, betrag: 3140.29 }, { stufe: 5, betrag: 3216.49 }, { stufe: 6, betrag: 3292.74 }, { stufe: 7, betrag: 3376.24 }, { stufe: 8, betrag: 3448.12 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 1, betrag: 2978.12 }, { stufe: 2, betrag: 3061.47 }, { stufe: 3, betrag: 3175.18 }, { stufe: 4, betrag: 3288.72 }, { stufe: 5, betrag: 3402.32 }, { stufe: 6, betrag: 3515.93 }, { stufe: 7, betrag: 3600.81 }, { stufe: 8, betrag: 3688.86 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 1, betrag: 3134.51 }, { stufe: 2, betrag: 3235.50 }, { stufe: 3, betrag: 3382.17 }, { stufe: 4, betrag: 3528.88 }, { stufe: 5, betrag: 3675.49 }, { stufe: 6, betrag: 3777.69 }, { stufe: 7, betrag: 3879.82 }, { stufe: 8, betrag: 3984.63 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 1, betrag: 3308.03 }, { stufe: 2, betrag: 3407.37 }, { stufe: 3, betrag: 3568.41 }, { stufe: 4, betrag: 3729.50 }, { stufe: 5, betrag: 3890.59 }, { stufe: 6, betrag: 3999.90 }, { stufe: 7, betrag: 4109.18 }, { stufe: 8, betrag: 4219.19 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 1, betrag: 3527.08 }, { stufe: 2, betrag: 3664.79 }, { stufe: 3, betrag: 3866.13 }, { stufe: 4, betrag: 4067.46 }, { stufe: 5, betrag: 4266.83 }, { stufe: 6, betrag: 4408.33 }, { stufe: 7, betrag: 4550.76 }, { stufe: 8, betrag: 4695.73 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 1, betrag: 3992.24 }, { stufe: 2, betrag: 4196.44 }, { stufe: 3, betrag: 4403.55 }, { stufe: 4, betrag: 4615.00 }, { stufe: 5, betrag: 4757.81 }, { stufe: 6, betrag: 4906.34 }, { stufe: 7, betrag: 5054.38 }, { stufe: 8, betrag: 5206.36 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 1, betrag: 4257.15 }, { stufe: 2, betrag: 4503.21 }, { stufe: 3, betrag: 4754.82 }, { stufe: 4, betrag: 5007.88 }, { stufe: 5, betrag: 5182.78 }, { stufe: 6, betrag: 5362.09 }, { stufe: 7, betrag: 5539.13 }, { stufe: 8, betrag: 5721.62 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 1, betrag: 4952.80 }, { stufe: 2, betrag: 5189.48 }, { stufe: 3, betrag: 5429.58 }, { stufe: 4, betrag: 5669.69 }, { stufe: 5, betrag: 5836.27 }, { stufe: 6, betrag: 6002.85 }, { stufe: 7, betrag: 6169.22 }, { stufe: 8, betrag: 6334.74 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 1, betrag: 5198.33 }, { stufe: 2, betrag: 5506.19 }, { stufe: 3, betrag: 5816.82 }, { stufe: 4, betrag: 6127.50 }, { stufe: 5, betrag: 6342.08 }, { stufe: 6, betrag: 6556.67 }, { stufe: 7, betrag: 6771.28 }, { stufe: 8, betrag: 6990.36 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 1, betrag: 6308.84 }, { stufe: 2, betrag: 6583.69 }, { stufe: 3, betrag: 6796.79 }, { stufe: 4, betrag: 7009.88 }, { stufe: 5, betrag: 7222.96 }, { stufe: 6, betrag: 7436.08 }, { stufe: 7, betrag: 7649.18 }, { stufe: 8, betrag: 7864.33 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 1, betrag: 6936.55 }, { stufe: 2, betrag: 7255.98 }, { stufe: 3, betrag: 7502.12 }, { stufe: 4, betrag: 7748.22 }, { stufe: 5, betrag: 7994.29 }, { stufe: 6, betrag: 8240.43 }, { stufe: 7, betrag: 8486.58 }, { stufe: 8, betrag: 8735.54 }] },
    ],
  },
  {
    code: "sh",
    name: "Schleswig-Holstein",
    verfuegbar: true,
    gueltigAb: "2026-01-01",
    entwurf: true,
    familienzuschlag: {
      gueltigAb: "2026-01-01",
      posten: [{ label: "Stufe 1", betrag: 176.24 }, { label: "Stufe 2", betrag: 376.09 }, { label: "Erhöhung für das zweite Kind", betrag: 199.85 }, { label: "Erhöhung ab dem dritten Kind (je Kind)", betrag: 516.48 }],
    },
    anwaerter: {
      gueltigAb: "2026-01-01",
      posten: [{ label: "A 6 bis A 8", betrag: 1527.18 }, { label: "A 9 bis A 11", betrag: 1604.56 }, { label: "A 12", betrag: 1772.84 }, { label: "A 13", betrag: 1806.53 }, { label: "A 13 + Zulage bzw. R 1", betrag: 1843.52 }],
    },
    gruppen: [
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 2, betrag: 3189.77 }, { stufe: 3, betrag: 3236.02 }, { stufe: 4, betrag: 3280.77 }, { stufe: 5, betrag: 3354.09 }, { stufe: 6, betrag: 3396.98 }, { stufe: 7, betrag: 3469.62 }, { stufe: 8, betrag: 3542.23 }, { stufe: 9, betrag: 3614.82 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 2, betrag: 3292.39 }, { stufe: 3, betrag: 3356.75 }, { stufe: 4, betrag: 3419.15 }, { stufe: 5, betrag: 3510.87 }, { stufe: 6, betrag: 3570.80 }, { stufe: 7, betrag: 3662.20 }, { stufe: 8, betrag: 3727.42 }, { stufe: 9, betrag: 3792.69 }, { stufe: 10, betrag: 3857.97 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 2, betrag: 3416.87 }, { stufe: 3, betrag: 3467.51 }, { stufe: 4, betrag: 3556.39 }, { stufe: 5, betrag: 3642.89 }, { stufe: 6, betrag: 3727.36 }, { stufe: 7, betrag: 3844.48 }, { stufe: 8, betrag: 3922.56 }, { stufe: 9, betrag: 4000.60 }, { stufe: 10, betrag: 4078.70 }, { stufe: 11, betrag: 4156.73 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 2, betrag: 3599.72 }, { stufe: 3, betrag: 3646.79 }, { stufe: 4, betrag: 3741.95 }, { stufe: 5, betrag: 3834.60 }, { stufe: 6, betrag: 3925.04 }, { stufe: 7, betrag: 4050.04 }, { stufe: 8, betrag: 4135.91 }, { stufe: 9, betrag: 4222.82 }, { stufe: 10, betrag: 4311.46 }, { stufe: 11, betrag: 4400.13 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 2, betrag: 3836.67 }, { stufe: 3, betrag: 3905.61 }, { stufe: 4, betrag: 4040.28 }, { stufe: 5, betrag: 4164.49 }, { stufe: 6, betrag: 4285.56 }, { stufe: 7, betrag: 4449.80 }, { stufe: 8, betrag: 4559.92 }, { stufe: 9, betrag: 4670.12 }, { stufe: 10, betrag: 4780.25 }, { stufe: 11, betrag: 4890.41 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 3, betrag: 4322.21 }, { stufe: 4, betrag: 4456.86 }, { stufe: 5, betrag: 4588.10 }, { stufe: 6, betrag: 4715.96 }, { stufe: 7, betrag: 4840.85 }, { stufe: 8, betrag: 4953.67 }, { stufe: 9, betrag: 5067.02 }, { stufe: 10, betrag: 5182.27 }, { stufe: 11, betrag: 5297.54 }, { stufe: 12, betrag: 5412.79 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 4, betrag: 4819.48 }, { stufe: 5, betrag: 4982.81 }, { stufe: 6, betrag: 5142.13 }, { stufe: 7, betrag: 5301.65 }, { stufe: 8, betrag: 5388.78 }, { stufe: 9, betrag: 5526.16 }, { stufe: 10, betrag: 5663.59 }, { stufe: 11, betrag: 5802.49 }, { stufe: 12, betrag: 5942.35 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 4, betrag: 5352.77 }, { stufe: 5, betrag: 5532.28 }, { stufe: 6, betrag: 5707.27 }, { stufe: 7, betrag: 5879.69 }, { stufe: 8, betrag: 5974.78 }, { stufe: 9, betrag: 6125.82 }, { stufe: 10, betrag: 6276.83 }, { stufe: 11, betrag: 6427.93 }, { stufe: 12, betrag: 6578.96 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 4, betrag: 5613.33 }, { stufe: 5, betrag: 5858.33 }, { stufe: 6, betrag: 6102.36 }, { stufe: 7, betrag: 6340.91 }, { stufe: 8, betrag: 6476.23 }, { stufe: 9, betrag: 6672.15 }, { stufe: 10, betrag: 6868.00 }, { stufe: 11, betrag: 7063.86 }, { stufe: 12, betrag: 7259.76 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 6, betrag: 6807.01 }, { stufe: 7, betrag: 7075.90 }, { stufe: 8, betrag: 7272.36 }, { stufe: 9, betrag: 7463.60 }, { stufe: 10, betrag: 7650.39 }, { stufe: 11, betrag: 7908.83 }, { stufe: 12, betrag: 8167.24 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 6, betrag: 7516.97 }, { stufe: 7, betrag: 7832.70 }, { stufe: 8, betrag: 8064.35 }, { stufe: 9, betrag: 8289.89 }, { stufe: 10, betrag: 8510.21 }, { stufe: 11, betrag: 8810.36 }, { stufe: 12, betrag: 9110.51 }] },
    ],
  },
  {
    code: "th",
    name: "Thüringen",
    verfuegbar: true,
    gueltigAb: "2025-02-01",
    entwurf: false,
    familienzuschlag: {
      gueltigAb: "2025-02-01",
      posten: [{ label: "Stufe 1", betrag: 177.25 }, { label: "Familienzuschlag für das erste Kind", betrag: 326.41 }, { label: "für das zweite Kind", betrag: 529.16 }, { label: "für das dritte Kind", betrag: 830.50 }, { label: "ab dem vierten Kind (je Kind)", betrag: 803.23 }],
    },
    anwaerter: {
      gueltigAb: "2025-02-01",
      posten: [{ label: "A 6 bis A 8", betrag: 1492.02 }, { label: "A 9 bis A 11", betrag: 1552.32 }, { label: "A 12", betrag: 1708.40 }, { label: "A 13", betrag: 1743.92 }, { label: "A 13 + Zulage bzw. R 1", betrag: 1782.92 }],
    },
    gruppen: [
      { gruppe: "A6", label: "A 6", stufen: [{ stufe: 3, betrag: 2885.36 }, { stufe: 4, betrag: 2962.12 }, { stufe: 5, betrag: 3038.91 }, { stufe: 6, betrag: 3115.65 }, { stufe: 7, betrag: 3192.45 }, { stufe: 8, betrag: 3269.23 }, { stufe: 9, betrag: 3345.96 }] },
      { gruppe: "A7", label: "A 7", stufen: [{ stufe: 3, betrag: 2986.74 }, { stufe: 4, betrag: 3082.53 }, { stufe: 5, betrag: 3178.34 }, { stufe: 6, betrag: 3274.16 }, { stufe: 7, betrag: 3369.99 }, { stufe: 8, betrag: 3438.39 }, { stufe: 9, betrag: 3506.84 }, { stufe: 10, betrag: 3575.31 }] },
      { gruppe: "A8", label: "A 8", stufen: [{ stufe: 3, betrag: 3070.00 }, { stufe: 4, betrag: 3192.78 }, { stufe: 5, betrag: 3315.56 }, { stufe: 6, betrag: 3438.34 }, { stufe: 7, betrag: 3561.16 }, { stufe: 8, betrag: 3643.02 }, { stufe: 9, betrag: 3724.83 }, { stufe: 10, betrag: 3806.75 }, { stufe: 11, betrag: 3888.58 }] },
      { gruppe: "A9", label: "A 9", stufen: [{ stufe: 3, betrag: 3252.47 }, { stufe: 4, betrag: 3383.53 }, { stufe: 5, betrag: 3514.55 }, { stufe: 6, betrag: 3645.63 }, { stufe: 7, betrag: 3776.68 }, { stufe: 8, betrag: 3866.75 }, { stufe: 9, betrag: 3956.89 }, { stufe: 10, betrag: 4046.93 }, { stufe: 11, betrag: 4137.05 }] },
      { gruppe: "A10", label: "A 10", stufen: [{ stufe: 3, betrag: 3470.15 }, { stufe: 4, betrag: 3635.75 }, { stufe: 5, betrag: 3801.35 }, { stufe: 6, betrag: 3966.97 }, { stufe: 7, betrag: 4132.56 }, { stufe: 8, betrag: 4243.00 }, { stufe: 9, betrag: 4355.63 }, { stufe: 10, betrag: 4468.54 }, { stufe: 11, betrag: 4581.50 }] },
      { gruppe: "A11", label: "A 11", stufen: [{ stufe: 4, betrag: 4015.41 }, { stufe: 5, betrag: 4185.08 }, { stufe: 6, betrag: 4357.03 }, { stufe: 7, betrag: 4530.64 }, { stufe: 8, betrag: 4646.38 }, { stufe: 9, betrag: 4762.11 }, { stufe: 10, betrag: 4877.88 }, { stufe: 11, betrag: 4993.57 }, { stufe: 12, betrag: 5109.32 }] },
      { gruppe: "A12", label: "A 12", stufen: [{ stufe: 4, betrag: 4326.35 }, { stufe: 5, betrag: 4533.31 }, { stufe: 6, betrag: 4740.28 }, { stufe: 7, betrag: 4947.26 }, { stufe: 8, betrag: 5085.22 }, { stufe: 9, betrag: 5223.18 }, { stufe: 10, betrag: 5361.16 }, { stufe: 11, betrag: 5499.22 }, { stufe: 12, betrag: 5637.12 }] },
      { gruppe: "A13", label: "A 13", stufen: [{ stufe: 5, betrag: 5073.12 }, { stufe: 6, betrag: 5296.64 }, { stufe: 7, betrag: 5520.13 }, { stufe: 8, betrag: 5669.13 }, { stufe: 9, betrag: 5818.10 }, { stufe: 10, betrag: 5967.11 }, { stufe: 11, betrag: 6116.14 }, { stufe: 12, betrag: 6265.14 }] },
      { gruppe: "A14", label: "A 14", stufen: [{ stufe: 5, betrag: 5370.04 }, { stufe: 6, betrag: 5658.74 }, { stufe: 7, betrag: 5947.40 }, { stufe: 8, betrag: 6139.84 }, { stufe: 9, betrag: 6332.31 }, { stufe: 10, betrag: 6524.76 }, { stufe: 11, betrag: 6717.25 }, { stufe: 12, betrag: 6909.70 }] },
      { gruppe: "A15", label: "A 15", stufen: [{ stufe: 7, betrag: 6531.77 }, { stufe: 8, betrag: 6785.69 }, { stufe: 9, betrag: 7039.60 }, { stufe: 10, betrag: 7293.50 }, { stufe: 11, betrag: 7547.44 }, { stufe: 12, betrag: 7801.35 }] },
      { gruppe: "A16", label: "A 16", stufen: [{ stufe: 7, betrag: 7221.85 }, { stufe: 8, betrag: 7515.52 }, { stufe: 9, betrag: 7809.19 }, { stufe: 10, betrag: 8102.84 }, { stufe: 11, betrag: 8396.52 }, { stufe: 12, betrag: 8690.16 }] },
    ],
  },
];

export function findLand(code: string): BesoldungstabelleLand | undefined {
  return BESOLDUNGSTABELLEN.find((l) => l.code === code);
}

export function gehaltFuerStufe(
  land: BesoldungstabelleLand,
  gruppe: string,
  stufe: number,
): number | null {
  const g = land.gruppen.find((x) => x.gruppe === gruppe);
  if (!g || g.stufen.length === 0) return null;
  const minStufe = g.stufen[0].stufe;
  const maxStufe = g.stufen[g.stufen.length - 1].stufe;
  const clamped = Math.min(Math.max(stufe, minStufe), maxStufe);
  const s = g.stufen.find((x) => x.stufe === clamped);
  return s ? s.betrag : null;
}

export function maxStufeFuerGruppe(
  land: BesoldungstabelleLand,
  gruppe: string,
): number {
  const g = land.gruppen.find((x) => x.gruppe === gruppe);
  if (!g || g.stufen.length === 0) return 8;
  return g.stufen[g.stufen.length - 1].stufe;
}

export function minStufeFuerGruppe(
  land: BesoldungstabelleLand,
  gruppe: string,
): number {
  const g = land.gruppen.find((x) => x.gruppe === gruppe);
  if (!g || g.stufen.length === 0) return 1;
  return g.stufen[0].stufe;
}
