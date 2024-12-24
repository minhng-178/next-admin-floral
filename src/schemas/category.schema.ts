import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(1),
});
