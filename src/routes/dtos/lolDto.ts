import { Expose } from 'class-transformer';
import { IsDefined, IsString, MaxLength } from 'class-validator';

class LolDto {
  @Expose()
  @IsDefined()
  @IsString()
  @MaxLength(100)
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export default LolDto;
