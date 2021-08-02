# TD Ameritrade

This project is a typescript wrapper for [TD Ameritrade's API][td-documentation]

[CHANGELOG](CHANGELOG.md)

## Responses

As you may notice from the return signatures of client methods and in regards to the unit tests, the response data nor the status code of some of the endpoints are known just from looking at the [documentation][td-documentation]. So what you see in the unit tests specifically for CUD operations is me taking my best guess as to what the status code should be.

[td-documentation]: https://developer.tdameritrade.com/
