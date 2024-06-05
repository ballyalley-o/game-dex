![NBA COVER](https://i.ibb.co/Sy1BpBx/cover.jpg)

# NBA API

This is a simple API that provides information about NBA teams and players. It was built using Typescript-Node.js, Express.js, and MongoDB. Using a microservice written in Python.

The API provides the following endpoints:

- GET /teams: Returns a list of NBA teams.
- GET /teams/:id: Returns a single NBA team.
- GET /players: Returns a list of NBA players.
- GET /players/:id: Returns a single NBA player.

  > Statistics are provided by the [NBA API](https://www.balldontlie.io/).

## Installation

1. Clone the repository:

```bash
git clone
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=3004
MONGO_URI=mongodb://localhost:27017/nba
```

4. Start the server:

```bash
npm run dev
```

<!-- SCRAPE -->

## Scrape Data

To scrape the data from the NBA API, you need to run the Python microservice. The microservice will scrape the data and save it to the MongoDB database.

1. run the `scrape` script:

```shell
sh scrape.sh
```
