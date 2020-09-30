const aMonitor = require("../index");

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

// FUNCTIONS

Monitor.start();
Monitor.stop();
Monitor.reload();

// EVENTS

Monitor.on("started", (monitor) => {
    // The monitor has been started because <Monitor>.start() or when any reload is finished.
    // console.log(monitor); // Monitor Data
});

Monitor.on("up", (monitor) => {
    // The website is online
});

Monitor.on("down", (monitor) => {
    // The website is offline
});

Monitor.on("stopped", (monitor) => {
    // The monitor has been stoped because reload or the executing of function <Monitor>.stop()
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