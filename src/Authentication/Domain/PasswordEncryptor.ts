import { Password } from 'src/Customers/Domain/Password';

export interface PasswordEncryptor {
  encrypt(password: string): Promise<Password>;
  compare(password: string, hash: string): Promise<boolean>;
}
