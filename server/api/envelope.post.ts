import { Envelope, envelopeSchema } from "~/types/envelope"
import { EnvelopeRequest } from "~/types/request/envelopeRequest"
import { EnvelopeModel } from "../models/envelopeModel"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<EnvelopeRequest>(event)
    const parsed = envelopeSchema.safeParse(body)

    if (parsed.success === false) {
      return createError({
        statusCode: 400,
        message: parsed.error.message,
      })
    }

    const envelope = {
      slug: parsed.data.slug,
      data: JSON.stringify(parsed.data.data),
    }

    const findResult = await EnvelopeModel.findOne({ slug: envelope.slug })
    if (findResult != null) {
      return createError({
        statusCode: 409,
        message: "Link already exists. Please try another one.",
      })
    }

    const envelopeDoc = await EnvelopeModel.create(envelope)
    await envelopeDoc.save()

    return envelope
  } catch (error) {
    console.log(error)
    return createError({
      statusCode: 500,
      message: "Internal server error",
    })
  }
})
