import CreateUser from '../type/CreateUser';

interface IAuthService {
  postRegisterUser(user: CreateUser): Promise<void>;
}

export default IAuthService;
