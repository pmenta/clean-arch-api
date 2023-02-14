import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'

import type { Controller } from './../protocols/controller'
import type { HttpResponse, httpRequest } from '../protocols/http'
import type { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-params-error'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

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

    if (!this.emailValidator.isValid(httpRequest.body.email)) return badRequest(new InvalidParamError('email'))

    return {
      statusCode: 200
    }
  }
}
