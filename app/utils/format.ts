//create a metod to format currency
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
    maximumSignificantDigits: 10,
  }).format(value);
};
