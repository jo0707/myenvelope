import { EnvelopeModel } from "../models/envelopeModel"
import { EnvelopeResponse } from "~/types/response/envelopeResponse"

export default defineEventHandler(async (event) => {
  try {
    const query = await getQuery(event)

    if (!query.slug)
      return createError({
        statusCode: 404,
        message: "Link not found",
      })

    const findResult = await EnvelopeModel.findOne({ slug: query.slug })
    if (findResult == null) {
      return createError({
        statusCode: 404,
        message: "Link not found",
      })
    }

    return {
      slug: findResult.slug,
      data: findResult.data,
    } as EnvelopeResponse
  } catch (error) {
    console.log(error)
    return createError({
      statusCode: 500,
      message: "Internal server error",
    })
  }
})
