import TdAmeritradeClient from '.';

export default class OptionChainsClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getOptionChain = () => {};
}
