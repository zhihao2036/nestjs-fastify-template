# Nestjs fastify server template

## Description

This is a template for a Nestjs fastify server.

### Features

- Nestjs
- Fastify
- TypeORM
- IoRedis
- Pino
- Docker
- Swagger
- TypeScript

### Database

- MySQL v8.0
- Redis

## Getting started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm run start
```

### Deploy

```bash
docker-compose -f docker-compose.yml up -d --build

docker logs -f nestjs-fastify-template-server
```

## Swagger

### URL

[http://localhost:8080/docs-api](http://localhost:8080/docs-api)

## Requirements

- Nodejs v20 or higher
