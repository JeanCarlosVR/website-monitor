# Website Monitor

Always have your website online. With a module that keeps you constantly informed about what is happening on your website.

# Events

- `started` The monitor has been started because Monitor.start() or when any reload is finished.
- `stopped` The monitor has been stopped the executing of function Monitor.stop() or any reload is finished.
- `up` The website is online.
- `down` The website is offline.
- `timeout` The request is timeout (options.maxTimeout).
- `error` any HTTP Error or Not valid HTTP Codes (options.acceptedHTTPCodes).
- `reloading` The monitor is in the process of reload.

# Functions

- `Monitor.start()` Stop this monitor.
- `Monitor.stop()` Stop this monitor.
- `Monitor.reload()` Reload this monitor.

# EXAMPLE

```js
const aMonitor = require("website-monitor");

let Monitor = new aMonitor({
    // Options
    websiteURL: "https://animalapi--jeancarlosvr.repl.co/api/v1/dogs",
    monitorName: "Animals API",
    interval: 15000,
    maxTimeout: 15000,
    acceptedHTTPCodes: [200],
    options: {

    }
});

const MonitorOptions = Monitor.start(); // Start to monitoring the webiste.
console.log(MonitorOptions); // This function return monitor options.

// EVENTS

Monitor.on("started", (monitor) => {
    // The monitor has been started because <Monitor>.start() or when any reload is finished.
    // console.log(monitor); // Monitor Data
});

Monitor.on("stopped", (monitor) => {
    // The monitor has been stopped the executing of function <Monitor>.stop() or any reload is finished.
});

Monitor.on("up", (monitor) => {
    // The website is online
});

Monitor.on("down", (monitor) => {
    // The website is offline
});

Monitor.on("timeout", (monitor) => {
    // The request is timeout (options.maxTimeout)
});

Monitor.on("error", (monitor, error) => {
    // any HTTP Error or Not valid HTTP Codes (options.acceptedHTTPCodes).
});

Monitor.on("reloading", (monitor) => {
    // The monitor is in the process of reload.
});
```
