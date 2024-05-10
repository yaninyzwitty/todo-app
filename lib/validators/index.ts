import { z } from "zod";
// import * as z from 'zod'

export const formSchema = z.object({
    todo: z.string().min(2).max(50, {
      message: "Username must be between 2 and 50 characters",
    }),
  });