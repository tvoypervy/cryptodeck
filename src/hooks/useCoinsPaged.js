import { useQuery, keepPreviousData } from "@tanstack/react-query";

export const useCoinsPaged = (page = 1) => {
  return useQuery({
    // ключ клеїм до сторінки, щоб кожну окремо кешувать
    queryKey: ["coinsPaged", page], 
    queryFn: async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Помилка завантаження сторінки монет");
      }
      return response.json();
    },
    // не видаляєм старе, поки грузить нове (ауф)
    placeholderData: keepPreviousData, 
  });
};