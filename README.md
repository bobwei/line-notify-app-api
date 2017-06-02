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
ln -s .envs/.dev.env .env
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

## Parse Server Links

- [parse-server](https://github.com/ParsePlatform/parse-server)
- [parse-dashboard](https://github.com/parse-community/parse-dashboard)
- [Parse Server Guide](http://docs.parseplatform.org/parse-server/guide)
- [Parse Server REST Guide](http://docs.parseplatform.org/rest/guide/)
- [Parse Server Javascript Guide](http://docs.parseplatform.org/js/guide/)
- [Parse Server Cloud Code Guide](http://docs.parseplatform.org/cloudcode/guide/)
