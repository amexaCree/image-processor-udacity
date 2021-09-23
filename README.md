# Welcome to image-processor 👋
[![Version](https://img.shields.io/npm/v/image-processor.svg)](https://www.npmjs.com/package/image-processor)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

A node express server application that serves thumbed images.

## Prerequisites

* npm >= 6.12.0
* node >= 12.13.0

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

### Creating a thumb image

1. Add image to assets/full folder in root directory of project (e.g. assets/full/test.jpg).

2. Start server with start script (shown above). The server is configured to run on localhost port 3000 (http:/localhost:3000).

3. Access server images API endpoint in browser with query parameters for image filename, thumb width and thumb height (shown below).

4. Thumb of image with indicated width and height is created in the assets/thumb folder.


### Images API endpoint
```sh
GET http:/localhost:3000/api/images
```

### Images API endpoint with query parameters

```sh
GET http:/localhost:3000/api/images?filename=test&width=200&height=100
```

> Note -
  This application only supports jpeg (.jpg) images currently.


## Run tests

```sh
npm run test
```

## Run build

```sh
npm run build
```




## Author

👤 **Amy Turnah**


## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
