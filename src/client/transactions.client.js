const baseUrl = process.env.REACT_APP_BACKEND_API_URL;

export const getTransaction = async (vehicleId) => {
  return fetch(`${baseUrl}/transactions/${vehicleId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
