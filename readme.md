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

Info Pony Requirements

* Collect the machine load (using “uptime” for example)
> * I used `process.memoryUsage()` to show memory usage for the service's process.  It seems like the requirement is more concerned with finding a reliable source of data to track and visualise.

* Display in the application the key statistics as well as a history of load over the past 10 minutes in 10s intervals. We’d suggest a graphical representation using D3.js, but feel free to use another tool or representation if you prefer. Make it easy for the end-user to picture the situation!
> * I used websockets to send stats from the web service to the UI.  Within the UI I used react, redux, recharts (a D3 wrapper) and Material-UI.

* Make sure a user can keep the web page open and monitor the load on their machine.
> * This is accommodated by keeping a cache of the stats and sending them to users when they connect to the service.

* Whenever the load for the past 2 minutes exceeds 1 on average, add a message saying that “High load generated an alert - load = {value}, triggered at {time}”
* Whenever the load average drops again below 1 on average for the past 2 minutes, Add another message explaining when the alert recovered.
* Make sure all messages showing when alerting thresholds are crossed remain visible on the page for historical reasons.
> * I changed the threshold to 1 minute to make the chart and alerts more interesting.
> * An alerts list below the chart shows when an alert is opened and closed.  This list persists even when the data is no longer in the chart.

* Write a test for the alerting logic
> I used enzyme to do some basic rendering tests.  Wow it's fast!  Most of the important pieces, particularly the agent and websocket middleware, have much better coverage.

* Explain how you’d improve on this application design
> * The current design doesn't do much to support multiple channels -- all users are subscribed to all events.  I might use router actions to subscribe the user to the correct channels in order to keep from overfeeding them or creating more network traffic than is necessary.
> * This is my first react project of any depth, and my first Material-UI and D3 project of any type.  I certainly could have spent more time understanding how to customize each individual component, but deferred to keeping things as simple as possible.
> * I would have liked to spend some time making state management (and possibly rendering) isopmorphic.  I may have simply used redux in my service instead of creating an event emitter.
> * When trying to share resources across projects that use different module loaders, it was important to remember that ES6 module loading is not baked into nodejs yet.
> * I could get lost for days in the comprehensive documentation for recharts.  There were a number of customisations I did not do in an effort to keep things as simple as possible.

# Setup

The info-pony express service requires Node 6 and npm 3 or higher.  To check, use these commands:

 * `npm -v`
 * `node -v`

Once these are ready, use `npm install` to install the application dependencies.

# Running Locally

Use `npm start` to run the application.  By default, the app will run at http://localhost:8081.

## Environment Variables

Here are the environment variables for the application:

```
HTTP_PORT=8081
IP_ADDRESS=localhost
SOCKET_ADDRESS=ws://localhost:8081
```

## Running on Cloud 9

[Cloud 9](https://c9.io/) is a cloud-based platform that provides a virtual machine where one can run a project.

Running this project on Cloud 9 is simple with these instructions:

* Fork the project to your own github
* Create a workspace for the repository
* Inside the workspace, upgrade node: `nvm install node 6`
* Then upgrade npm: `npm install -g npm`
* Install the project dependencies `npm install`
* Use the project task: `npm run start:c9`

Then one can use the preview pane to view the application.

# Testing

`npm test`

## Coverage

On non-Windows platforms, use:
 * `npm run coverage`

Otherwise, when on Windows use:
 * `npm run coverage:win`

Getting reliable code coverage in JS can be a challenge.  Here is an issue that
helped me get [coverage while using Windows](https://github.com/jmcriffey/babel-istanbul/issues/70#issuecomment-238753515).
