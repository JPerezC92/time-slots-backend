import * as bcrypt from 'bcrypt';
import { PasswordEncryptor } from '../Domain/PasswordEncryptor';
import { Password } from 'src/Customers/Domain/Password';

export class BcrypPasswordEncryptor implements PasswordEncryptor {
  public async encrypt(password: string): Promise<Password> {
    const passwordEncrypted = await bcrypt.hash(password, 10);

    return new Password(passwordEncrypted);
  }

  public async compare(
    password: string,
    passwordEncrypted: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordEncrypted);
  }
}
