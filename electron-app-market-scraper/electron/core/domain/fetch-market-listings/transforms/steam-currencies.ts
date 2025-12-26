const CURRENCIES: Record<string, string> = {
  "2001": "USD",
  "2002": "GBP",
  "2003": "EUR",
  "2004": "CHF",
  "2005": "RUB",
  "2006": "PLN",
  "2007": "BRL",
  "2008": "JPY",
  "2009": "NOK",
  "2010": "IDR",
  "2011": "MYR",
  "2012": "PHP",
  "2013": "SGD",
  "2014": "THB",
  "2015": "VND",
  "2016": "KRW",
  "2017": "TRY",
  "2018": "UAH",
  "2019": "MXN",
  "2020": "CAD",
  "2021": "AUD",
  "2022": "NZD",
  "2023": "CNY",
  "2024": "INR",
  "2025": "CLP",
  "2026": "PEN",
  "2027": "COP",
  "2028": "ZAR",
  "2029": "HKD",
  "2030": "TWD",
  "2031": "SAR",
  "2032": "AED",
  "2033": "SEK",
  "2034": "ARS",
  "2035": "ILS",
  "2036": "BYN",
  "2037": "KZT",
  "2038": "KWD",
  "2039": "QAR",
  "2040": "CRC",
  "2041": "UYU",
  "2042": "BGN",
  "2043": "HRK",
  "2044": "CZK",
  "2045": "DKK",
  "2046": "HUF",
  "2047": "RON",
} as const;

const getCurrencyISO = (currencyMarketId: `${number}` | number): string => {
  const convertedToString = currencyMarketId.toString();
  const currency = CURRENCIES[convertedToString];
  if (currency === undefined) throw new Error("Invalid currency");
  return currency;
};

const getSelectedCurrecyISO = (
  eventType: number,
  currencyId: `${number}`,
  recievedCurrency: `${number}`
) => {
  if (eventType === 3) return getCurrencyISO(recievedCurrency);
  else if (eventType === 4) return getCurrencyISO(currencyId);
  else throw new Error("Invalid EventType for selecting currencies");
};

export { getCurrencyISO, getSelectedCurrecyISO };
