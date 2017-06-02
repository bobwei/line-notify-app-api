# Parse Server Boilerplate

This is a parse-server project template with batteries included to speed up project initiation.


## Getting Started

- Config ENV
- Run Docker
- Install Node Dependencies
- Start Server

### Config ENV

```
mkdir .envs
cp .example.env .envs/.dev.env
ln -s .env .envs/.dev.env
```

### Run Docker

```
docker-compose -f docker-compose.dev.dbs.yml up -d
```

### Install Node Dependencies

```
yarn
```

### Start Server

```
yarn start
```
