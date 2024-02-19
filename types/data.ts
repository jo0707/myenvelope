import { z } from "zod"

export const dataSchema = z.object({
  name: z.string().max(64),
  music: z.object({
    volume: z.number().max(100).min(0),
    id: z.number(),
    src: z.string(),
    autoplay: z.boolean(),
    loop: z.boolean(),
  }),
  background: z.object({
    topColor: z.string().length(7).startsWith("#"),
    bottomColor: z.string().length(7).startsWith("#"),
    type: z.string(),
    starAngle: z.number().max(360).min(0),
    starQuantity: z.number().max(5000).min(0),
    starOpacity: z.array(z.number().max(1).min(0)).length(2),
    starSize: z.array(z.number().max(15)).length(2),
    lineSpeed: z.number().max(10).min(0).optional(),
    lineSpread: z.number().max(5).min(0).optional(),
    lineColorStart: z.string().length(7).startsWith("#").optional(),
    lineColorStop: z.string().length(7).startsWith("#").optional(),
  }),
  typing: z.object({ delay: z.number().max(500), textColor: z.string().length(7).startsWith("#") }),
  messages: z.array(
    z.object({
      text: z.string(),
      position: z.number().max(3).min(1).optional(),
      image: z.string().optional(),
      type: z.string().optional(),
      color: z.string().optional(),
    })
  ),
})

export type Data = z.infer<typeof dataSchema>
export type Message = z.infer<typeof dataSchema.shape.messages>[0]
