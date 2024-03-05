import { Envelope, envelopeSchema } from "~/types/envelope"
import { EnvelopeRequest } from "~/types/request/envelopeRequest"
import { EnvelopeModel } from "../models/envelopeModel"

export default defineEventHandler(async (event) => {
  try {
    let url = getQuery(event).url?.toString()

    if (!url)
      return createError({
        statusCode: 400,
        message: "Image URL is required",
      })

    if (url.includes("pasteboard.co")) {
      url = `https://gcdnb.pbrd.co/images/${url.split("/").pop()}?o=1`
    }

    const blob = await $fetch(url)
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer, "base64")
    return buffer
  } catch (error) {
    console.log(error)
    return createError({
      statusCode: 500,
      message: "Internal server error",
    })
  }
})
