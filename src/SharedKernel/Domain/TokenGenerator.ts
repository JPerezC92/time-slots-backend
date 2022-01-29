import { AccessPayloadProps } from 'src/Authentication/Domain/AccessPayload';

export interface TokenGenerator {
  sign(payload: AccessPayloadProps): string;
}
