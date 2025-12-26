const getSelectedPrice = (
  eventType: number,
  paidAmount: number,
  paidFee: number,
  receivedAmount: number
) => {
  if (eventType === 3) return receivedAmount;
  else if (eventType === 4) return paidAmount + paidFee;
  else throw new Error("EventType not supported");
};

const sanitizePrice = (rawPrice: number) => {
  return Math.round((rawPrice / 100) * 100) / 100;
};

const getPrice = (
  eventType: number,
  paidAmount: number,
  paidFee: number,
  receivedAmount: number
) => {
  const selectedPrice = getSelectedPrice(
    eventType,
    paidAmount,
    paidFee,
    receivedAmount
  );
  const finalPrice = sanitizePrice(selectedPrice);
  return finalPrice;
};

export { getSelectedPrice, sanitizePrice, getPrice };
