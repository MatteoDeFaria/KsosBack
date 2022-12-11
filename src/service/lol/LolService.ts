import ILolService from '../ILolService';

class LolService implements ILolService {
  private userList: string[];

  constructor() {
    this.userList = ['toto', 'tata'];
  }

  async getData() {
    return this.userList;
  }
}

export default LolService;
