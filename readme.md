# Info Pony

Build Status: [![Build Status](https://travis-ci.org/jmptr/info-pony.svg?branch=master)](https://travis-ci.org/jmptr/info-pony)

Coverage: [![Coverage Status](https://coveralls.io/repos/github/jmptr/info-pony/badge.svg?branch=master)](https://coveralls.io/github/jmptr/info-pony?branch=master)

Info pony is a simple web app using:
 * [React](https://facebook.github.io/react/).  Facebook's popular ui framework.
 * [Redux](http://redux.js.org/).  Popular state management container for web applications.
 * [Material-ui](http://www.material-ui.com/).  React components based on Google's Material Design guidelines.
 * [Recharts](http://recharts.org/). A popular charting library based on [D3](https://d3js.org/).
 * [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).  A lightning-fast TCP wrapper that allows direct communication over a socket.
 * [Mocha](https://mochajs.org/).  A simple test runner for node.
 * [Chai](http://chaijs.com/).  A simple assertion framework for node.
 * [Enzyme](https://github.com/airbnb/enzyme).  AirBnB's popular React component testing framework.
 * [webpack](https://webpack.github.io/).  The dominant web application bundler.
 * [Node.js](https://nodejs.org/en/).  A runtime for JavaScript applications.
 * [Express](https://expressjs.com/).  A popular framework for developing HTTP applications.

# Setup

The info-pony express service requires Node 6 and npm 3 or higher.  To check, use these commands:

 * `npm -v`
 * `node -v`

Once these are ready, use `npm install` to install the application dependencies.

# Running Locally

## Tasks

# Testing

`npm test`

## Coverage

On non-Windows platforms, use:
 * `npm run coverage`

Otherwise, when on Windows use:
 * `npm run coverage:win`

Getting reliable code coverage in JS can be a challenge.  Here is an issue that
helped me get [coverage while using Windows](https://github.com/jmcriffey/babel-istanbul/issues/70#issuecomment-238753515).
