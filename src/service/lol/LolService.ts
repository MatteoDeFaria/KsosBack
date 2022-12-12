import axios from 'axios';
import ILolService from '../ILolService';
import { valueRank, valuePalier, board, request, uuid } from './LolUserValues';
import UserInfo from '../../type/LolTypes';

class LolService implements ILolService {
  private userList: string[];

  private board: string[] = board;

  private valueRank: string[] = valueRank;

  private valuePalier: string[] = valuePalier;

  private request: string[] = request;

  private uuid: string[] = uuid;

  constructor() {
    this.userList = ['toto', 'tata'];
  }

  static async apiCall(url: string): Promise<any> {
    return axios({
      method: 'get',
      url,
      headers: {},
    })
      .then((response) => response.data)
      .catch((error) => error);
  }

  async getData() {
    return this.userList;
  }

  async getLeaderboard() {
    const listOfApiCall = this.request.map(async (element) =>
      LolService.apiCall(
        `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${element}?api_key=${process.env.RIOT_API_KEY}`
      )
    );

    const result = await Promise.all(listOfApiCall).then((element) =>
      element
        .flat()
        .filter((elem: UserInfo) => elem.queueType === 'RANKED_SOLO_5x5')
    );

    return result.map((element: UserInfo) => ({
        ...element,
        tier:
          element.tier.charAt(0) +
          element.tier.substring(1).toLocaleLowerCase(),
      }));
  }
}

export default LolService;
