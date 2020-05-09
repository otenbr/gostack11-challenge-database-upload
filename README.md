<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/otenbr/gostack11-challenge-database-upload?color=%2304D361">

  <img alt="Made by José Antonio" src="https://img.shields.io/badge/made%20by-José%20Antonio-%2304D361">

  <img alt="GitHub" src="https://img.shields.io/github/license/otenbr/gostack11-challenge-database-upload?color=%2304D361">

</p>

# GoStack 11 Challenge: Database Upload

In this challenge was necessary create a api to register bank transaction. The data will be stored in the Postgre database.
The client can create income and outcome transactions and list registered transactions. There is a validation that not allow the client register a transaction if the total balance lower than outcome value.

The client can also import the transactions by a file in CSV format. [Click here](assets/file.csv) to see a example of import file.

## Getting Started

### Prerequisites

- Node.js
- Yarn (_optional_)

### Install

Clone the repository to your machine.

```sh
git clone https://github.com/otenbr/gostack11-challenge-database-upload.git
```

Change to solution directory

```sh
$ cd gostack11-challenge-database-upload
```

Run the command `npm` or `yarn`.

```sh
$ yarn
```

### Run

Run the command `npm run dev:server` or `yarn dev:server`.

```sh
$ yarn dev:server
```

### Test

To execute the unit tests, run the command `npm run test` or `yarn test`.

```sh
$ yarn test
```

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)
- [ts-node-dev](https://github.com/whitecolor/ts-node-dev)
- [multer]()
- [TypeORM](https://typeorm.io/#/)
- [csv-parse](https://csv.js.org/)
- [PostgreSQL](https://www.postgresql.org/)

## License

[MIT](LICENSE.md)
