import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertResponse } from "@shared/routes";

// We only really need to CREATE a response (Yes/No)
export function useCreateResponse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertResponse) => {
      // Validate with Zod before sending if needed, but API contract handles it
      const res = await fetch(api.responses.create.path, {
        method: api.responses.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Something went wrong!');
      }
      
      return api.responses.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      // Optional: invalidate if we were listing responses
      queryClient.invalidateQueries({ queryKey: [api.responses.list.path] });
    },
  });
}
