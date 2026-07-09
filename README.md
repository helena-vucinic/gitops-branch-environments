# GitOps Branch Environments

Mini Node.js and Express application prepared for running through multiple Docker Compose configurations.

## Technologies

- Node.js
- Express
- Docker
- Docker Compose
- GitHub Actions

## Project Structure

```text
.
├── src/
│   └── index.js
├── .github/
│   └── workflows/
│       └── pipeline.yml
├── Dockerfile
├── docker-compose.dev.yml
├── docker-compose.test.yml
├── docker-compose.prod.yml
├── package.json
├── package-lock.json
└── README.md
```

## Application

The application is a simple Express API located in `src/index.js`.

Available routes:

```text
GET /
GET /health
GET /config
```

### `/`

Returns a basic application message and the active environment.

### `/health`

Returns the application status.

### `/config`

Returns the current application configuration, including the active environment, port and message.

## Environment Variables

The application uses the following environment variables:

```text
PORT
APP_ENV
APP_MESSAGE
NODE_ENV
```

If `PORT` is not provided, the application uses port `3000`.

## Local Installation

Install dependencies:

```bash
npm install
```

Run the application locally:

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

## Docker

Build the Docker image:

```bash
docker build -t gitops-branch-environments .
```

Run the Docker container:

```bash
docker run -p 3000:3000 gitops-branch-environments
```

Check the application:

```text
http://localhost:3000/config
```

## Docker Compose Environments

The repository contains three Docker Compose files:

```text
docker-compose.dev.yml
docker-compose.test.yml
docker-compose.prod.yml
```

Each file starts the same application with different environment variables, container names and host ports.

## Run DEV Environment

```bash
docker compose -p gitops-dev -f docker-compose.dev.yml up --build -d
```

Open:

```text
http://localhost:3001/config
```

Stop:

```bash
docker compose -p gitops-dev -f docker-compose.dev.yml down
```

## Run TEST Environment

```bash
docker compose -p gitops-test -f docker-compose.test.yml up --build -d
```

Open:

```text
http://localhost:3002/config
```

Stop:

```bash
docker compose -p gitops-test -f docker-compose.test.yml down
```

## Run PROD Environment

```bash
docker compose -p gitops-prod -f docker-compose.prod.yml up --build -d
```

Open:

```text
http://localhost:3000/config
```

Stop:

```bash
docker compose -p gitops-prod -f docker-compose.prod.yml down
```

## Run All Environments

All three environments can run at the same time because they use different host ports.

```bash
docker compose -p gitops-dev -f docker-compose.dev.yml up --build -d
docker compose -p gitops-test -f docker-compose.test.yml up --build -d
docker compose -p gitops-prod -f docker-compose.prod.yml up --build -d
```

Check running containers:

```bash
docker ps
```

Available URLs:

```text
DEV:  http://localhost:3001/config
TEST: http://localhost:3002/config
PROD: http://localhost:3000/config
```

Stop all environments:

```bash
docker compose -p gitops-dev -f docker-compose.dev.yml down
docker compose -p gitops-test -f docker-compose.test.yml down
docker compose -p gitops-prod -f docker-compose.prod.yml down
```

## GitHub Actions

The workflow file is located at:

```text
.github/workflows/pipeline.yml
```

The workflow reacts to:

```text
push on dev, test and main
pull_request to test and main
```

Depending on the branch or pull request target, it starts the corresponding Docker Compose configuration and checks the application endpoints.

## Useful Commands

Check Git branches:

```bash
git branch -a
```

Switch to a branch:

```bash
git checkout dev
git checkout test
git checkout main
```

Check running Docker containers:

```bash
docker ps
```

Check Docker images:

```bash
docker images
```

Remove stopped containers:

```bash
docker container prune
```
