import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Joi from 'joi';

import {
  JSendSuccess,
  StatusType,
} from 'src/SharedKernel/Infrastructure/Response';
import { AuthLogger } from 'src/Authentication/Application/AuthLogger';
import { Email } from 'src/Customers/Domain/Email';
import { Password } from 'src/Customers/Domain/Password';
import { TypeormCustomerRepository } from 'src/Customers/Infrastructure/TypeormCustomerRepositpry';
import { Uow } from 'src/SharedKernel/Infrastructure/database/Uow.service';

interface LoginRequest {
  readonly body: {
    readonly email: string;
    readonly password: string;
  };
}

class LoginRequestDto {
  readonly body: {
    readonly email: string;
    readonly password: string;
  };

  constructor(props: LoginRequest) {
    this.body = props.body;
  }
}

const loginRequestSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

@Controller()
export class AuthenticationPostLoginController {
  private readonly _authLogger: AuthLogger;

  constructor(
    private readonly _uow: Uow,
    private _jwtService: JwtService,
    private _typeormCustomerRepository: TypeormCustomerRepository,
  ) {
    this._authLogger = new AuthLogger({
      tokenGenerator: this._jwtService,
      customerRepository: this._typeormCustomerRepository,
    });
  }

  @Post('login')
  public async run(@Body() _body: LoginRequest['body']): Promise<JSendSuccess> {
    const { body } = this.validate({ body: _body });

    const accessToken = await this._uow.transaction(async () =>
      this._authLogger.execute({
        email: new Email(body.email),
        password: new Password(body.password),
      }),
    );

    return { status: StatusType.SUCCESS, data: { accessToken } };
  }

  private validate(registerRequest: LoginRequest): LoginRequestDto {
    const { error } = loginRequestSchema.validate(registerRequest);

    if (error) {
      throw new BadRequestException({
        status: StatusType.FAIL,
        data: error.message,
      });
    }

    return new LoginRequestDto(registerRequest);
  }
}
