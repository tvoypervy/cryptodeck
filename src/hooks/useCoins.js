import { useQuery } from "@tanstack/react-query";

const COINS_API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";

export const useCoins = () => {
  return useQuery({
    queryKey: ["coins"],

    queryFn: async () => {
      const response = await fetch(COINS_API_URL);
      
      if (!response.ok) {
        throw new Error("API download error")
      }
      return response.json();
    }
  });
};