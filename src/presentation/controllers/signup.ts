import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import type { HttpResponse, httpRequest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: httpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('Missing param: name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('Missing param: email'))
    }

    return {
      statusCode: 200
    }
  }
}
