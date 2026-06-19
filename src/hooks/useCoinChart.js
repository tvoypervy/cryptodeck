import { useQuery } from "@tanstack/react-query";

export const useCoinChart = (coinId) => {
  return useQuery({
    // тут ключ закинутий в копійку
    queryKey: ["coinChart", coinId], 
    queryFn: async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      if (!response.ok) {
        throw new Error("Помилка завантаження даних графіка");
      }
      const data = await response.json();
      
      return data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString("uk-UA", {
          day: "2-digit",
          month: "2-digit",
        }),
        price: parseFloat(price.toFixed(2)),
      }));
    },
    // рефрешим кожні 15 сек
    refetchInterval: 15000, 
    // тут щоб запит не видавався старим як порошенко
    staleTime: 5000, 
  });
};