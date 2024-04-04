# pagopa-arc-be-mock

## About The Project

### Built With
 * [express](https://expressjs.com)
## Getting Started

### Prerequisites
 * [nodejs](http://nodejs.org)

### Configuration
This mock uses the following environment variables:

| Name                             | Description                                                                       | Required | Default value |
|----------------------------------|-----------------------------------------------------------------------------------|----------|---------------|
| ENDPOINT_DELAY                   | Delay time in milliseconds applied to every endpoint                              | No       | 0             |

You must set up environment variables by creating a `.env` file. You can use the provided example file as such to get default values for these variables:

```shell
$ cp env.example .env
```

### Installation
Install dependencies with
```shell
$ yarn
```

### Usage

Run in development with
```shell
$ yarn dev
```
if a file is changed under the src/ directory the app will be rebuilt automatically

Build the package with

```shell
$ yarn build
```

then, you can just use:

```shell
$ yarn start
```
