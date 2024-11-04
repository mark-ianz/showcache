import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCurrencyRates() {
  const api_key = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

  const { data, isLoading, error } = useQuery({
    queryKey: ["currencyRates"],
    queryFn: async () => {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${api_key}/latest/USD`
      );
      return response.data.conversion_rates;
    },
    staleTime: 1000 * 60 * 60 * 24 * 7
  });
  
  return { data, isLoading, error };
}