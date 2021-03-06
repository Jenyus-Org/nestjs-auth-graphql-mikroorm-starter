<p align="center">
  <a href="https://jenyus.web.app/" target="blank"><img src="https://avatars.githubusercontent.com/u/71438996?s=200&v=4" width="200" alt="Jenyus Logo" /></a>
</p>

## Description

A fork of the [Nest](https://github.com/nestjs/nest) framework TypeScript boilerplate with PassportJS authentication, GraphQL and OpenAPI docs integrations using MikroORM.

## Setup

- Uses code-first GraphQL
- Uses MikroORM for entities and migrations
- Implements refresh token based auth flow
- Uses PassportJS and JWT for authentication
- Custom Prettier and ESLint config
- Uses [`@jenyus-org/nestjs-graphql-utils`](https://github.com/Jenyus-Org/graphql-utils) to optimize queries and [solve the N+1 problem](https://ravianand.web.app/blog/graphql-utils)

### Configuration Files

#### Environment Variables

`.env`

```env
JWT_KEY=<your-jwt-key-here>
```

#### TypeORM

`ormconfig.js`

```js
const { join } = require("path");

module.exports = {
  type: "sqlite",
  synchronize: true,
  entities: ["dist/**/*.entity.js"],
  database: "tmp/data.sqlite",
  migrations: [join(__dirname, "database", "migrations", "*.ts")],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};
```

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## License

This boilerplate remains true to Nest and is [MIT licensed](LICENSE).
