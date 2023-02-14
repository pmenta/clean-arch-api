import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import type { HttpResponse, httpRequest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: httpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    const validatePayload = requiredFields.reduce((acc: string[], field) => {
      if (!httpRequest.body[field]) {
        return [...acc, field]
      }
      return acc
    }, [])

    if (validatePayload.length > 0) {
      return badRequest(new MissingParamError(validatePayload.join(', ') + ''))
    }

    return {
      statusCode: 200
    }
  }
}
