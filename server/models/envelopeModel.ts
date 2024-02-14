import { defineMongooseModel } from "#nuxt/mongoose"
import { EnvelopeResponse } from "~/types/response/envelopeResponse"

export const EnvelopeModel = defineMongooseModel<EnvelopeResponse>("Envelope", {
  slug: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
})
