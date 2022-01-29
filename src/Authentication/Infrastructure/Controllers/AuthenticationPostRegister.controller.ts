import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Joi from 'joi';

import { BcrypPasswordEncryptor } from '../BcrypPasswordEncryptor';
import { CustomerId } from 'src/Customers/Domain/CustomerId';
import { CustomerRegistrator } from 'src/Authentication/Application/CustomerRegistrator';
import { Email } from 'src/Customers/Domain/Email';
import { FirstName } from 'src/Customers/Domain/FirstName';
import {
  JSendSuccess,
  StatusType,
} from 'src/SharedKernel/Infrastructure/Response';
import { JsUuidGenerator } from 'src/SharedKernel/Infrastructure/JsUuidGenerator';
import { LastName } from 'src/Customers/Domain/LastName';
import { TypeormAuthRepository } from '../TypeormAuthRepository';
import { Uow } from 'src/SharedKernel/Infrastructure/database/Uow.service';

interface RegisterRequest {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

class RegisterRequestDto {
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly password: string;

  constructor(props: RegisterRequest) {
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.password = props.password;
  }
}

export const registerRequestSchema = Joi.object<RegisterRequest>({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
});

@Controller()
export class AuthenticationPostRegisterController {
  private readonly _customerRegistrator: CustomerRegistrator;

  constructor(
    private readonly _jsUuidGenerator: JsUuidGenerator,
    private readonly _jwtService: JwtService,
    private readonly _typeormAuthRepository: TypeormAuthRepository,
    private readonly _uow: Uow,
  ) {
    this._customerRegistrator = new CustomerRegistrator({
      authRepository: this._typeormAuthRepository,
      passwordEncryptor: new BcrypPasswordEncryptor(),
      tokenGenerator: this._jwtService,
    });
  }

  @Post('register')
  public async run(@Body() _body: RegisterRequest): Promise<JSendSuccess> {
    const body = this.validate(_body);

    try {
      const accessToken = await this._uow.transaction(
        async () =>
          await this._customerRegistrator.execute({
            customerId: new CustomerId(this._jsUuidGenerator.generate()),
            email: new Email(body.email),
            firstName: new FirstName(body.firstName),
            lastName: new LastName(body.lastName),
            password: body.password,
          }),
      );

      return { status: StatusType.SUCCESS, data: { accessToken } };
    } catch (error) {
      console.log(error);

      return { status: StatusType.SUCCESS, data: {} };
    }
  }

  private validate(registerRequest: RegisterRequest): RegisterRequestDto {
    const { error } = registerRequestSchema.validate(registerRequest);

    if (error) {
      throw new BadRequestException({
        status: StatusType.FAIL,
        data: error.message,
      });
    }

    return new RegisterRequestDto(registerRequest);
  }
}
