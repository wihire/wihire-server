## How to run in your local machine

1. Clone the repository
2. Make sure you have `Node.js v16.13.0` installed
3. Make sure you have `yarn` installed
4. Duplicate `.env.example` file into `.env` and make changes accordingly
5. Run `yarn install` in project directory to install all the dependencies
6. Run `yarn prepare:husky`
7. Run `yarn prisma:migrate`
8. Run `yarn start:dev` to start the website in your local machine with development mode or `yarn start` to start the website in your local machine with production mode

## How to see database

You can run the following command to see the database in your local machine

```bash
yarn prisma:studio
```
