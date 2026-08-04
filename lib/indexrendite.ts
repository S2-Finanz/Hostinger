// Jahresrenditen wichtiger Weltindizes (Stand: vom Mandanten bereitgestellte
// Übersicht, August 2026). Veränderung des Indexstandes 01.01.-31.12. je
// Kalenderjahr, keine Währungsumrechnung, keine Kosten, keine Steuern.
//
// Datenqualität: Nur S&P 500 und DAX 40 sind Zelle für Zelle gegen eine
// externe Quelle (finanzen.net Hoch/Tief-Statistik) verifiziert. Alle
// übrigen 13 Reihen sind sorgfältige, aber ungeprüfte Näherungswerte
// ("Schätzwert") mit einer erwartbaren Abweichung von meist unter einem
// Prozentpunkt – einzelne Jahre können deutlicher abweichen. Diese Reihen
// dürfen laut Quellenvermerk nicht ungeprüft für Kundenunterlagen oder
// Beratungsdokumentation verwendet werden; im Rechner werden sie daher
// klar als Schätzwert gekennzeichnet.
//
// Kurs- vs. Performanceindex: Kursindizes (S&P 500, Nikkei, CAC 40 usw.)
// bilden nur die Kursentwicklung ab, Dividenden fehlen. Performanceindizes
// (DAX, MDAX) und die MSCI-Net-Reihen enthalten Dividenden. Ein direkter
// Vergleich ist dadurch systematisch verzerrt (Größenordnung 2-3
// Prozentpunkte pro Jahr zugunsten der Performance-/Net-Reihen).
//
// Währung: Jede Reihe steht in ihrer Heimatwährung (MSCI-Reihen in USD).
// Für einen Anleger im Euroraum weicht die tatsächliche Rendite je nach
// Wechselkursentwicklung teils erheblich ab.

export type IndexId =
  | "msci-world"
  | "msci-em"
  | "sp500"
  | "dow-jones"
  | "nasdaq"
  | "euro-stoxx-50"
  | "ftse-100"
  | "cac-40"
  | "smi"
  | "dax"
  | "mdax"
  | "nikkei-225"
  | "hang-seng"
  | "shanghai-composite"
  | "bse-sensex";

export type IndexMeta = {
  id: IndexId;
  name: string;
  region: string;
  waehrung: string;
  typ: "Kursindex" | "Performanceindex" | "Net Total Return";
  verifiziert: boolean;
  ersteJahr: number;
};

export const INDIZES: IndexMeta[] = [
  { id: "msci-world", name: "MSCI World", region: "Welt", waehrung: "USD", typ: "Net Total Return", verifiziert: false, ersteJahr: 1970 },
  { id: "msci-em", name: "MSCI Emerging Markets", region: "Schwellenländer", waehrung: "USD", typ: "Net Total Return", verifiziert: false, ersteJahr: 1988 },
  { id: "sp500", name: "S&P 500", region: "USA", waehrung: "USD", typ: "Kursindex", verifiziert: true, ersteJahr: 1928 },
  { id: "dow-jones", name: "Dow Jones Industrial", region: "USA", waehrung: "USD", typ: "Kursindex", verifiziert: false, ersteJahr: 1970 },
  { id: "nasdaq", name: "Nasdaq Composite", region: "USA", waehrung: "USD", typ: "Kursindex", verifiziert: false, ersteJahr: 1971 },
  { id: "euro-stoxx-50", name: "EURO STOXX 50", region: "Eurozone", waehrung: "EUR", typ: "Kursindex", verifiziert: false, ersteJahr: 1990 },
  { id: "ftse-100", name: "FTSE 100", region: "Großbritannien", waehrung: "GBP", typ: "Kursindex", verifiziert: false, ersteJahr: 1985 },
  { id: "cac-40", name: "CAC 40", region: "Frankreich", waehrung: "EUR", typ: "Kursindex", verifiziert: false, ersteJahr: 1989 },
  { id: "smi", name: "SMI", region: "Schweiz", waehrung: "CHF", typ: "Kursindex", verifiziert: false, ersteJahr: 1989 },
  { id: "dax", name: "DAX 40", region: "Deutschland", waehrung: "EUR", typ: "Performanceindex", verifiziert: true, ersteJahr: 1959 },
  { id: "mdax", name: "MDAX", region: "Deutschland", waehrung: "EUR", typ: "Performanceindex", verifiziert: false, ersteJahr: 1996 },
  { id: "nikkei-225", name: "Nikkei 225", region: "Japan", waehrung: "JPY", typ: "Kursindex", verifiziert: false, ersteJahr: 1970 },
  { id: "hang-seng", name: "Hang Seng", region: "Hongkong", waehrung: "HKD", typ: "Kursindex", verifiziert: false, ersteJahr: 1990 },
  { id: "shanghai-composite", name: "Shanghai Composite", region: "China", waehrung: "CNY", typ: "Kursindex", verifiziert: false, ersteJahr: 1991 },
  { id: "bse-sensex", name: "BSE Sensex", region: "Indien", waehrung: "INR", typ: "Kursindex", verifiziert: false, ersteJahr: 1991 },
];

// Letztes vollständig abgeschlossenes Kalenderjahr in der Datengrundlage.
// Das laufende Jahr ist nicht enthalten, da es noch nicht beendet ist.
export const LETZTES_VOLLSTAENDIGES_JAHR = 2025;

export const JAHRESRENDITEN: Record<IndexId, Record<number, number>> = {
  "msci-world": { 1970: -0.031, 1971: 0.184, 1972: 0.225, 1973: -0.152, 1974: -0.255, 1975: 0.328, 1976: 0.134, 1977: 0.047, 1978: 0.165, 1979: 0.11, 1980: 0.257, 1981: -0.048, 1982: 0.097, 1983: 0.219, 1984: 0.047, 1985: 0.406, 1986: 0.419, 1987: 0.162, 1988: 0.233, 1989: 0.166, 1990: -0.17, 1991: 0.183, 1992: -0.052, 1993: 0.225, 1994: 0.051, 1995: 0.207, 1996: 0.135, 1997: 0.158, 1998: 0.243, 1999: 0.249, 2000: -0.132, 2001: -0.168, 2002: -0.199, 2003: 0.331, 2004: 0.147, 2005: 0.095, 2006: 0.201, 2007: 0.09, 2008: -0.407, 2009: 0.3, 2010: 0.118, 2011: -0.055, 2012: 0.158, 2013: 0.267, 2014: 0.049, 2015: -0.009, 2016: 0.075, 2017: 0.224, 2018: -0.087, 2019: 0.277, 2020: 0.159, 2021: 0.218, 2022: -0.181, 2023: 0.238, 2024: 0.187, 2025: 0.216 },
  "msci-em": { 1988: 0.404, 1989: 0.65, 1990: -0.106, 1991: 0.599, 1992: 0.114, 1993: 0.748, 1994: -0.073, 1995: -0.052, 1996: 0.06, 1997: -0.116, 1998: -0.253, 1999: 0.664, 2000: -0.306, 2001: -0.024, 2002: -0.062, 2003: 0.558, 2004: 0.256, 2005: 0.34, 2006: 0.322, 2007: 0.394, 2008: -0.533, 2009: 0.785, 2010: 0.189, 2011: -0.184, 2012: 0.182, 2013: -0.026, 2014: -0.022, 2015: -0.149, 2016: 0.112, 2017: 0.373, 2018: -0.146, 2019: 0.184, 2020: 0.183, 2021: -0.025, 2022: -0.201, 2023: 0.098, 2024: 0.075, 2025: 0.27 },
  "sp500": { 1928: 0.3788, 1929: -0.1191, 1930: -0.2848, 1931: -0.4707, 1932: -0.1478, 1933: 0.4408, 1934: -0.0471, 1935: 0.4137, 1936: 0.2792, 1937: -0.3859, 1938: 0.2455, 1939: -0.0518, 1940: -0.1509, 1941: -0.1786, 1942: 0.1243, 1943: 0.1945, 1944: 0.138, 1945: 0.3072, 1946: -0.1187, 1947: 0, 1948: -0.0065, 1949: 0.1046, 1950: 0.2168, 1951: 0.1635, 1952: 0.1178, 1953: -0.0662, 1954: 0.4502, 1955: 0.264, 1956: 0.0262, 1957: -0.1431, 1958: 0.3806, 1959: 0.0848, 1960: -0.0297, 1961: 0.2313, 1962: -0.1181, 1963: 0.1889, 1964: 0.1297, 1965: 0.0906, 1966: -0.1309, 1967: 0.2009, 1968: 0.0766, 1969: -0.1136, 1970: 0.001, 1971: 0.1079, 1972: 0.1563, 1973: -0.1737, 1974: -0.2972, 1975: 0.3155, 1976: 0.1915, 1977: -0.115, 1978: 0.0106, 1979: 0.1231, 1980: 0.2577, 1981: -0.0973, 1982: 0.1476, 1983: 0.1727, 1984: 0.014, 1985: 0.2633, 1986: 0.1462, 1987: 0.0203, 1988: 0.124, 1989: 0.2725, 1990: -0.0656, 1991: 0.2631, 1992: 0.0446, 1993: 0.0706, 1994: -0.0154, 1995: 0.3411, 1996: 0.2026, 1997: 0.3101, 1998: 0.2667, 1999: 0.1953, 2000: -0.1014, 2001: -0.1304, 2002: -0.2337, 2003: 0.2607, 2004: 0.0941, 2005: 0.0337, 2006: 0.1354, 2007: 0.0358, 2008: -0.3877, 2009: 0.2473, 2010: 0.1163, 2011: 0, 2012: 0.1341, 2013: 0.296, 2014: 0.1139, 2015: -0.0073, 2016: 0.0954, 2017: 0.1942, 2018: -0.0624, 2019: 0.2888, 2020: 0.1626, 2021: 0.2689, 2022: -0.1944, 2023: 0.2423, 2024: 0.2331, 2025: 0.1639 },
  "dow-jones": { 1970: 0.048, 1971: 0.061, 1972: 0.146, 1973: -0.166, 1974: -0.276, 1975: 0.383, 1976: 0.179, 1977: -0.173, 1978: -0.031, 1979: 0.042, 1980: 0.149, 1981: -0.092, 1982: 0.196, 1983: 0.203, 1984: -0.037, 1985: 0.277, 1986: 0.226, 1987: 0.023, 1988: 0.118, 1989: 0.27, 1990: -0.043, 1991: 0.203, 1992: 0.042, 1993: 0.137, 1994: 0.021, 1995: 0.335, 1996: 0.26, 1997: 0.226, 1998: 0.161, 1999: 0.252, 2000: -0.062, 2001: -0.071, 2002: -0.168, 2003: 0.253, 2004: 0.031, 2005: -0.006, 2006: 0.163, 2007: 0.064, 2008: -0.338, 2009: 0.188, 2010: 0.11, 2011: 0.055, 2012: 0.073, 2013: 0.265, 2014: 0.075, 2015: -0.022, 2016: 0.134, 2017: 0.251, 2018: -0.056, 2019: 0.223, 2020: 0.072, 2021: 0.187, 2022: -0.088, 2023: 0.137, 2024: 0.129, 2025: 0.11 },
  "nasdaq": { 1971: 0.274, 1972: 0.172, 1973: -0.311, 1974: -0.351, 1975: 0.298, 1976: 0.261, 1977: 0.073, 1978: 0.123, 1979: 0.281, 1980: 0.339, 1981: -0.032, 1982: 0.187, 1983: 0.199, 1984: -0.112, 1985: 0.314, 1986: 0.074, 1987: -0.053, 1988: 0.154, 1989: 0.193, 1990: -0.178, 1991: 0.568, 1992: 0.155, 1993: 0.147, 1994: -0.032, 1995: 0.399, 1996: 0.227, 1997: 0.216, 1998: 0.396, 1999: 0.856, 2000: -0.393, 2001: -0.211, 2002: -0.315, 2003: 0.5, 2004: 0.086, 2005: 0.014, 2006: 0.095, 2007: 0.098, 2008: -0.405, 2009: 0.439, 2010: 0.169, 2011: -0.018, 2012: 0.159, 2013: 0.383, 2014: 0.134, 2015: 0.057, 2016: 0.075, 2017: 0.282, 2018: -0.039, 2019: 0.352, 2020: 0.436, 2021: 0.214, 2022: -0.331, 2023: 0.434, 2024: 0.286, 2025: 0.21 },
  "euro-stoxx-50": { 1990: -0.211, 1991: 0.062, 1992: -0.059, 1993: 0.395, 1994: -0.069, 1995: 0.083, 1996: 0.224, 1997: 0.364, 1998: 0.32, 1999: 0.467, 2000: -0.027, 2001: -0.202, 2002: -0.373, 2003: 0.157, 2004: 0.069, 2005: 0.213, 2006: 0.151, 2007: 0.068, 2008: -0.444, 2009: 0.211, 2010: -0.058, 2011: -0.171, 2012: 0.138, 2013: 0.179, 2014: 0.012, 2015: 0.038, 2016: 0.007, 2017: 0.065, 2018: -0.143, 2019: 0.248, 2020: -0.051, 2021: 0.21, 2022: -0.117, 2023: 0.192, 2024: 0.083, 2025: 0.13 },
  "ftse-100": { 1985: 0.152, 1986: 0.223, 1987: 0.02, 1988: 0.047, 1989: 0.351, 1990: -0.115, 1991: 0.163, 1992: 0.142, 1993: 0.201, 1994: -0.103, 1995: 0.203, 1996: 0.116, 1997: 0.247, 1998: 0.145, 1999: 0.178, 2000: -0.102, 2001: -0.162, 2002: -0.245, 2003: 0.136, 2004: 0.075, 2005: 0.167, 2006: 0.107, 2007: 0.038, 2008: -0.313, 2009: 0.221, 2010: 0.09, 2011: -0.056, 2012: 0.058, 2013: 0.144, 2014: -0.027, 2015: -0.049, 2016: 0.144, 2017: 0.076, 2018: -0.125, 2019: 0.121, 2020: -0.143, 2021: 0.143, 2022: 0.009, 2023: 0.038, 2024: 0.057, 2025: 0.15 },
  "cac-40": { 1989: 0.266, 1990: -0.224, 1991: 0.16, 1992: 0.05, 1993: 0.221, 1994: -0.171, 1995: -0.005, 1996: 0.237, 1997: 0.295, 1998: 0.315, 1999: 0.511, 2000: -0.005, 2001: -0.22, 2002: -0.338, 2003: 0.161, 2004: 0.074, 2005: 0.234, 2006: 0.175, 2007: 0.013, 2008: -0.427, 2009: 0.223, 2010: -0.033, 2011: -0.17, 2012: 0.152, 2013: 0.18, 2014: -0.005, 2015: 0.085, 2016: 0.049, 2017: 0.093, 2018: -0.11, 2019: 0.264, 2020: -0.071, 2021: 0.289, 2022: -0.095, 2023: 0.165, 2024: -0.022, 2025: 0.1 },
  "smi": { 1989: 0.2, 1990: -0.213, 1991: 0.175, 1992: 0.172, 1993: 0.455, 1994: -0.1, 1995: 0.227, 1996: 0.173, 1997: 0.588, 1998: 0.143, 1999: 0.057, 2000: 0.075, 2001: -0.211, 2002: -0.278, 2003: 0.185, 2004: 0.037, 2005: 0.332, 2006: 0.159, 2007: -0.034, 2008: -0.348, 2009: 0.183, 2010: -0.017, 2011: -0.078, 2012: 0.149, 2013: 0.202, 2014: 0.095, 2015: -0.018, 2016: -0.068, 2017: 0.141, 2018: -0.102, 2019: 0.26, 2020: 0.008, 2021: 0.203, 2022: -0.167, 2023: 0.038, 2024: 0.042, 2025: 0.07 },
  "dax": { 1959: 0.1541, 1960: 0.2784, 1961: -0.0829, 1962: -0.2113, 1963: 0.1362, 1964: 0.0889, 1965: -0.1161, 1966: -0.2107, 1967: 0.5093, 1968: 0.1041, 1969: 0.1202, 1970: -0.2868, 1971: 0.0667, 1972: 0.1328, 1973: -0.2612, 1974: 0.0139, 1975: 0.4017, 1976: -0.0962, 1977: 0.0792, 1978: 0.047, 1979: -0.1344, 1980: -0.0339, 1981: 0.0198, 1982: 0.1272, 1983: 0.4001, 1984: 0.0606, 1985: 0.6643, 1986: 0.0484, 1987: -0.3018, 1988: 0.3279, 1989: 0.3483, 1990: -0.219, 1991: 0.1286, 1992: -0.0209, 1993: 0.4671, 1994: -0.0706, 1995: 0.0699, 1996: 0.2817, 1997: 0.4711, 1998: 0.1771, 1999: 0.371, 2000: -0.0703, 2001: -0.1985, 2002: -0.4445, 2003: 0.3942, 2004: 0.0749, 2005: 0.2803, 2006: 0.215, 2007: 0.2105, 2008: -0.3995, 2009: 0.2478, 2010: 0.1519, 2011: -0.1469, 2012: 0.298, 2013: 0.2477, 2014: 0.0265, 2015: 0.0956, 2016: 0.0687, 2017: 0.1251, 2018: -0.1826, 2019: 0.2548, 2020: 0.0355, 2021: 0.1579, 2022: -0.1235, 2023: 0.2031, 2024: 0.1885, 2025: 0.2301 },
  "mdax": { 1996: 0.125, 1997: 0.395, 1998: 0.064, 1999: -0.06, 2000: 0.036, 2001: -0.079, 2002: -0.33, 2003: 0.478, 2004: 0.203, 2005: 0.36, 2006: 0.286, 2007: 0.049, 2008: -0.432, 2009: 0.34, 2010: 0.349, 2011: -0.121, 2012: 0.339, 2013: 0.391, 2014: 0.022, 2015: 0.227, 2016: 0.068, 2017: 0.181, 2018: -0.176, 2019: 0.317, 2020: 0.088, 2021: 0.141, 2022: -0.285, 2023: 0.081, 2024: -0.057, 2025: 0.14 },
  "nikkei-225": { 1970: -0.158, 1971: 0.366, 1972: 0.919, 1973: -0.173, 1974: -0.114, 1975: 0.142, 1976: 0.145, 1977: -0.025, 1978: 0.234, 1979: 0.095, 1980: 0.083, 1981: 0.079, 1982: 0.044, 1983: 0.234, 1984: 0.167, 1985: 0.136, 1986: 0.426, 1987: 0.146, 1988: 0.399, 1989: 0.29, 1990: -0.387, 1991: -0.036, 1992: -0.264, 1993: 0.029, 1994: 0.132, 1995: 0.007, 1996: -0.026, 1997: -0.212, 1998: -0.093, 1999: 0.368, 2000: -0.272, 2001: -0.235, 2002: -0.186, 2003: 0.245, 2004: 0.076, 2005: 0.402, 2006: 0.069, 2007: -0.111, 2008: -0.421, 2009: 0.19, 2010: -0.03, 2011: -0.173, 2012: 0.229, 2013: 0.567, 2014: 0.071, 2015: 0.091, 2016: 0.004, 2017: 0.191, 2018: -0.121, 2019: 0.182, 2020: 0.16, 2021: 0.049, 2022: -0.094, 2023: 0.282, 2024: 0.192, 2025: 0.25 },
  "hang-seng": { 1990: 0.066, 1991: 0.421, 1992: 0.283, 1993: 1.157, 1994: -0.311, 1995: 0.23, 1996: 0.335, 1997: -0.203, 1998: -0.063, 1999: 0.688, 2000: -0.11, 2001: -0.245, 2002: -0.182, 2003: 0.349, 2004: 0.132, 2005: 0.045, 2006: 0.342, 2007: 0.393, 2008: -0.483, 2009: 0.52, 2010: 0.053, 2011: -0.2, 2012: 0.229, 2013: 0.029, 2014: 0.013, 2015: -0.072, 2016: 0.004, 2017: 0.36, 2018: -0.136, 2019: 0.091, 2020: -0.034, 2021: -0.141, 2022: -0.155, 2023: -0.138, 2024: 0.177, 2025: 0.3 },
  "shanghai-composite": { 1991: 1.294, 1992: 1.666, 1993: 0.068, 1994: -0.223, 1995: -0.143, 1996: 0.651, 1997: 0.302, 1998: -0.039, 1999: 0.192, 2000: 0.517, 2001: -0.206, 2002: -0.175, 2003: 0.103, 2004: -0.154, 2005: -0.083, 2006: 1.304, 2007: 0.967, 2008: -0.654, 2009: 0.8, 2010: -0.143, 2011: -0.217, 2012: 0.032, 2013: -0.067, 2014: 0.529, 2015: 0.094, 2016: -0.123, 2017: 0.066, 2018: -0.246, 2019: 0.223, 2020: 0.139, 2021: 0.048, 2022: -0.151, 2023: -0.037, 2024: 0.127, 2025: 0.15 },
  "bse-sensex": { 1991: 0.82, 1992: 0.37, 1993: 0.28, 1994: 0.17, 1995: -0.21, 1996: -0.01, 1997: 0.19, 1998: -0.16, 1999: 0.64, 2000: -0.21, 2001: -0.18, 2002: 0.04, 2003: 0.73, 2004: 0.13, 2005: 0.42, 2006: 0.47, 2007: 0.47, 2008: -0.52, 2009: 0.81, 2010: 0.17, 2011: -0.25, 2012: 0.26, 2013: 0.09, 2014: 0.3, 2015: -0.05, 2016: 0.02, 2017: 0.28, 2018: 0.06, 2019: 0.14, 2020: 0.16, 2021: 0.22, 2022: 0.04, 2023: 0.19, 2024: 0.08, 2025: 0.08 },
};

export function findIndex(id: IndexId): IndexMeta {
  const meta = INDIZES.find((i) => i.id === id);
  if (!meta) throw new Error(`Unbekannter Index: ${id}`);
  return meta;
}

export function renditeFuerJahr(id: IndexId, jahr: number): number | undefined {
  return JAHRESRENDITEN[id][jahr];
}

export type EinmalanlageErgebnis = {
  endwert: number;
  jahre: number;
  datenLueckeAbJahr: number | null;
};

// Einmalige Anlage im Geburtsjahr, jährlich verzinst mit den echten
// Kalenderjahres-Renditen bis zum letzten vollständigen Jahr.
export function berechneEinmalanlage(
  id: IndexId,
  geburtsjahr: number,
  betrag: number,
): EinmalanlageErgebnis {
  let wert = betrag;
  let jahre = 0;
  let datenLueckeAbJahr: number | null = null;

  for (let jahr = geburtsjahr; jahr <= LETZTES_VOLLSTAENDIGES_JAHR; jahr++) {
    const rendite = renditeFuerJahr(id, jahr);
    if (rendite === undefined) {
      if (datenLueckeAbJahr === null) datenLueckeAbJahr = jahr;
      continue;
    }
    wert *= 1 + rendite;
    jahre++;
  }

  return { endwert: wert, jahre, datenLueckeAbJahr };
}

export type SparplanErgebnis = {
  endwert: number;
  eingezahlt: number;
  sparjahre: number;
  datenLueckeAbJahr: number | null;
};

// Monatliches Sparen von Geburt bis zum 18. Geburtstag (18 Kalenderjahre),
// danach keine weiteren Einzahlungen, das Kapital bleibt aber investiert.
// Vereinfachung: Da nur Jahresrenditen vorliegen, wird der Jahresbeitrag
// (12 Monatsraten) als zu Jahresbeginn eingezahlt behandelt und erhält die
// volle Jahresrendite – eine unterjährige, monatsgenaue Verzinsung ist auf
// Basis von Jahresdaten nicht seriös abbildbar.
export function berechneSparplan(
  id: IndexId,
  geburtsjahr: number,
  monatsrate: number,
): SparplanErgebnis {
  const letztesSparjahr = geburtsjahr + 17;
  let wert = 0;
  let eingezahlt = 0;
  let sparjahre = 0;
  let datenLueckeAbJahr: number | null = null;

  for (let jahr = geburtsjahr; jahr <= LETZTES_VOLLSTAENDIGES_JAHR; jahr++) {
    const rendite = renditeFuerJahr(id, jahr);
    if (rendite === undefined) {
      if (datenLueckeAbJahr === null) datenLueckeAbJahr = jahr;
      continue;
    }
    if (jahr <= letztesSparjahr) {
      const jahresbeitrag = monatsrate * 12;
      wert += jahresbeitrag;
      eingezahlt += jahresbeitrag;
      sparjahre++;
    }
    wert *= 1 + rendite;
  }

  return { endwert: wert, eingezahlt, sparjahre, datenLueckeAbJahr };
}
