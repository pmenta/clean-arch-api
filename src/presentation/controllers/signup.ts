import { MissingParamError } from '../errors/missing-params-error'
import type { HttpResponse, httpRequest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: httpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('Missing param: name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('Missing param: email')
      }
    }

    return {
      statusCode: 200
    }
  }
}
