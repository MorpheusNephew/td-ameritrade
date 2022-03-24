# TD Ameritrade

This project is a typescript wrapper for [TD Ameritrade's API][td-documentation]

- [TD Ameritrade](#td-ameritrade)
  - [Usage](#usage)
  - [Responses](#responses)

## Usage

The default class of [clients][td-client] is the TdAmeritradeClient. It must be initialized with your client id and each client sub-client is a property of the TdAmeritradeClient for example the [accounts client][accounts-client].

```typescript
import TdAmeritradeClient from '@morpheusnephew/td-ameritrade/clients';

(async () => {
  // Initializing TD Ameritrade client with your client id and access token
  const client = new TdAmeritradeClient({
    clientId: 'yourClientId',
    accessToken: 'yourAccessToken',
  });

  // Makes request to get all accounts associated with your access token
  const { data: allAccounts } = await client.accounts.getAllAccounts();
})();
```

## Responses

As you may notice from the return signatures of client methods and in regards to the unit tests, the response data nor the status code of some of the endpoints are known just from looking at the [documentation][td-documentation]. So what you see in the unit tests specifically for CUD operations is me taking my best guess as to what the status code should be.

[td-documentation]: https://developer.tdameritrade.com/
[change-log]: https://github.com/MorpheusNephew/td-ameritrade/blob/main/CHANGELOG.md
[td-client]: https://github.com/MorpheusNephew/td-ameritrade/blob/main/src/clients/index.ts
[accounts-client]: https://github.com/MorpheusNephew/td-ameritrade/blob/main/src/clients/accounts-client.ts
