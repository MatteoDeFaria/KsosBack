import { Expose, Exclude } from 'class-transformer';
import {
  IsAlphanumeric,
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class RegisterDto {

  @Expose()
  @IsDefined()
  @IsString()
  @IsAlphanumeric()
  @MaxLength(100)
  username: string;

  @Expose()
  @IsDefined()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @Expose()
  @Exclude({ toPlainOnly: true })
  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  constructor(username: string, email: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}

export default RegisterDto;
