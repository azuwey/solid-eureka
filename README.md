# Solid-eureka

Solid-eureka is a mock country voting application with Typescript, Next.JS, REST, React and Tailwind.

## Installation

```bash
npm install
```

## Running the application

To run the application you first need to migrate the database by running the following command:

```shell
npx prisma migrate deploy
```

After you migrated the database, you can use the following commands to build and then run the application in production
mode:

```shell
# Builds the application
npm run build

# Starts the application
npm run start:prod
```

Now you should be able to access it at `http://localhost:3000/`.

## Development

To run the development build you need to run the client and server application at the same time, but first you need to
migrate the database running the following command:

```shell
npx prisma migrate dev
```

After that you can use the following commands to run both application in development mode:

```shell
npm run start:dev
```

Now you should be able to access the application at `http://localhost:3000`.

## Tech stack

- Prisma with SQLite
- Typescript
- Next.JS
- React
- Tailwind
- SWR
