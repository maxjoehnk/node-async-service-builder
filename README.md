# async-service-builder

Build small async services

## Installation

```bash
npm i async-service-builder
```
or
```bash
yarn add async-service-builder
```

## Usage

```typescript
import { build } from 'async-service-builder';

const serviceA = build(async() => {
    // do your async work
});

const serviceB = build(async() => {
    // do your async work
}, 10000);

serviceA(); // runs every 5 seconds
serviceB(); // runs every 10 seconds
```

## API

### build(worker: () => Promise<void>, timeout = 5000): () => Promise<void>

Build a new service which pauses for `timeout` between runs.

Won't crash when the worker throws.

It will terminate it self when the process exits.