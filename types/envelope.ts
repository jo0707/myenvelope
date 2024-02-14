import { z } from "zod"
import { dataSchema } from "./data"

export const envelopeSchema = z.object({
  slug: z.string(),
  data: dataSchema,
})

export type Envelope = z.infer<typeof envelopeSchema>
