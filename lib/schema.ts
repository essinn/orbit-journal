import { z } from "zod";

export const journalSchema = z.object({
  title: z.string(),
  content: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  mood: z.enum(["🤩", "😊", "😐", "😢", "😠"]),
});
