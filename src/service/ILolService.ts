import UserInfo from '../type/LolTypes';

interface ILolService {
  getData(): Promise<string[]>;
  getLeaderboard(): Promise<UserInfo[]>;
}

export default ILolService;
