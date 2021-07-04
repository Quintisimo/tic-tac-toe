This is a [Next.js](https://nextjs.org/) typescript project

It needs the latest [lts node](https://nodejs.org/en/) to run and [docker](https://www.docker.com/) to build the image

## Getting Started

To run the development server:

```bash
npm run dev
```

To build and run the docker image:

```bash
docker-compose up --build
```

## API Endpoint

One api endpoint is exposed at `/api/state` that receives a post request with the current player and board state. It send back a json object with a message, a boolean if the game is over and a boolean if there is a winner.

## Extensions

- Could add a db to keep track of player scores and have a leaderboard of top players
- Caching board state in the browser's local storage or in a db table to handle cases of network loss where the ui cannot connect with the server
