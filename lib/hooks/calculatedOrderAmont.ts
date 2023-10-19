// Securely calculate the order amount, including tax
export const calculateOrderAmount = (
  items: any,
  taxCalculation: { tax_amount_exclusive: number },
) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total with any exclusive taxes on the server to prevent
  // people from directly manipulating the amount on the client
  let orderAmount = 1400;
  orderAmount += taxCalculation.tax_amount_exclusive;
  return orderAmount;
};
