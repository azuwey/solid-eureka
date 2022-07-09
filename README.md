# Solid-eureka

[![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=solid-eureka)](https://solid-eureka.vercel.app/)

Solid-eureka is a mock country nationality application with Typescript, Next.JS, REST, React and Tailwind.

Deployed application accessible [here](https://solid-eureka.vercel.app/).

## Installation

```bash
npm install
```

## Setting up the database

Before you can run the application you need to set up the database connection by creating a `.env` file with the
following content:

```text
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=<SCHEMA>"
```

Short explanation of each component:

- `<USER>`: The name of your database user
- `<PASSWORD>`: The password for your database user
- `<HOST>`: The name of your host name (for the local environment, it is `localhost`)
- `<PORT>`: The port where your database server is running (typically `5432` for PostgreSQL)
- `<DATABASE>`: The name of the [database](https://www.postgresql.org/docs/12/manage-ag-overview.html)
- `<SCHEMA>`: The name of the [schema](https://www.postgresql.org/docs/12/ddl-schemas.html) inside the database

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

- Prisma with PostgreSQL
- Typescript
- Next.JS
- React
- Tailwind
- SWR

## Taught process

Since the application needed two parts a back-end and a front-end I choose to use Next.JS because it's fairly easy to
do these two things using it.

First I design the front-end part of the application with Tailwind, and made use of the mobile first breakpoint system,
after that because I already knew what fields I'm going to need it was pretty easy to implement the back-end side of
things.

On the back-end side first I implemented the `/nat` endpoint which make use of the 3rd party `randomuser.me` API. After
that I implemented the `/vote` end-point, and I designed in a way, that it can basically use any variation of the
`abbreviation` because it only depends on what the client sends to this end-point. On the front-end part I used
optimistic data update for the vote, because this way we don't have to wait for the server to answer our client, but
the UI can update with the new data.

## Database

The database is pretty small, there are only two fields:

- `abbreviation`: this stores the `nat` field from the API as uppercase string
- `voteCount`: as the name suggest this stores the number of votes

The migrations can be found under the [`prisma/migrations`](/prisma/migrations) folder.

## Questions

- When first I have seen the task I was thinking about storing data that come from the `randomuser.me` API, since the seed
is always the same, so my question is: is it would have been an acceptable solution to store this data in a database, so
not using the `randomuser.me` API only in the seeding process?
- Do I have to use the 
`https://randomuser.me/api/?results=300&nat=de,dk,fr,gb&inc=id,gender,name,location,email,dob,picture,nat&seed=flightright`
endpoint or is it acceptable to use this:
`https://randomuser.me/api/?results=300&nat=de,dk,fr,gb&inc=location,picture,nat&seed=flightright`? Because my API
doesn't use all the fields.
