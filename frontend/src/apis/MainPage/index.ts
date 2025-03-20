import { fetchWithAuth } from "../utils";

export const getExampleApi = async () => {
  const response = await fetchWithAuth("/api/example");
  return response.json();
};
