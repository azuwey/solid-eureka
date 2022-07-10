# Solid-eureka

[![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=solid-eureka)](https://solid-eureka.vercel.app/)

Solid-eureka is a mock country nationality application with Typescript, Next.JS, REST, Prisma, PostgreSQL, React and
Tailwind.

Deployed application accessible [here](https://solid-eureka.vercel.app/).

## Requirements

- `npx 8.x or up`
- `Node.JS 16.x or up` or `Docker or Podman`

## Setting up the application

## Database setup

Before you can run the application you need to set up the database connection by creating a `.env` file with the
following content:

```text
DATABASE_URL=postgres://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
```

Short explanation of each component:

- `<USER>`: The name of your database user
- `<PASSWORD>`: The password for your database user
- `<HOST>`: The name of your host name (for the local environment, it is `localhost`)
- `<PORT>`: The port where your database server is running (typically `5432` for PostgreSQL)
- `<DATABASE>`: The name of the [database](https://www.postgresql.org/docs/12/manage-ag-overview.html)

### Running the application in production mode

#### Running the migrations

To run the migrations you need to run the following command:

```shell
npx prisma migrate deploy
```

Or if you would like to run the migration manually you can find the migration files under the
[`prisma/migrations/*`](/prisma/migrations) folder, but make sure you run them in chronologically order.

#### Without docker

You can use the following commands to build and then run the application in production mode:

```shell
# Builds the application
npm run build

# Starts the application
npm run start:prod
```

Now you should be able to access it at `http://localhost:3000/`.

#### With docker or podman

To run the application in a containerized environment first you need to build it by running one of these commands:

```shell
# With docker
docker build -t solid-eureka-container .

# or with podman
podman build -t solid-eureka-container .
```

After you built the image, you can use one of these commands to run the application:

```shell
# With docker
docker run -p 3000:3000 --env-file=.env solid-eureka-container

# or with podman
podman run -p 3000:3000 --env-file=.env solid-eureka-container
```

### Running the application in development mode

Before you can the application, you need two things, the first on is making sure that you have `database creation`
permission, and the second one is running the following command to run the migrations:

```shell
npx prisma migrate dev
```

After that you can use the following commands to run the application in development mode:

```shell
npm run start:dev
```

Now you should be able to access the application at `http://localhost:3000`.

## Taught process

I choose to use Next.js to solve the challenge, because it is easy to implement both the front-end and the back-end side
of the application with only using one framework.

On the back-end side of things, as the problem required for the `/nat` endpoint, I used `fetch` to `GET` the data from
`randomuser.me` API, after that I aggregate the data into one object, after that I query the database to get all the
voting data and change include it on the above mention object and in the last step I send it to the client as `JSON`.

The other endpoint is the `/vote` this responsible to store a new vote in the database.

On the database side of things, I design a very small database only with one table called `Nationality`, this has two
plus one field, on of these field is called `abbreviation`, this stores the `nat` field from the API as a unique
uppercase string, the other one is `voteCount`, as the name suggest this stores the number of votes, and the last one is
the `id`, as the name suggest this a unique identification number.

On the front-end side of thing I choose to use Tailwind because it's a framework-agnostic css framework with great
mobile-first support.

To query the data from the API I used SWR, because it doesn't need a lot of setup, and it has optimistic update
functionality, this is useful in the application, because we don't need to block the UI while we wait for the API to
answer our request, and still update the UI with the correct data.

I choose to use container - presentation pattern to separate the data loading logic into a different component than the
presentation, so it can be more readable, and it is easier to test it even though I didn't write any test for this
application.

## Questions

- When first I have seen the task I was thinking about storing data that come from the `randomuser.me` API, since the
seed is always the same, so my question is: is it would have been an acceptable solution to store this data in a
database, so not using the `randomuser.me` API only in the seeding process?
- Do I have to use the 
`https://randomuser.me/api/?results=300&nat=de,dk,fr,gb&inc=id,gender,name,location,email,dob,picture,nat&seed=flightright`
endpoint or is it acceptable to use this:
`https://randomuser.me/api/?results=300&nat=de,dk,fr,gb&inc=location,picture,nat&seed=flightright`? Because my API
doesn't use all the fields.
