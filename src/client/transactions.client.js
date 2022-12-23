const baseUrl =
  process.env.NOVE_ENV !== "production"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export const getTransaction = async (vehicleId) => {
  return fetch(`${baseUrl}/transactions/${vehicleId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
