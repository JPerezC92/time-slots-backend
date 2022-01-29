import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/SharedKernel/Infrastructure/EnvVar';
import { AccessPayload, AccessPayloadProps } from '../Domain/AccessPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(EnvironmentVariables.JWT_SECRET),
    });
  }

  async validate(jwtPayloadProps: AccessPayloadProps) {
    return new AccessPayload(jwtPayloadProps);
  }
}
