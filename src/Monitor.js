"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class Monitor extends events_1.default.EventEmitter {
    constructor(options) {
        super();
        if (!(options || options.websiteURL))
            throw new Error("[Monitor] The parameter (websiteURL) is undefined.");
        this.options = new Object();
        this.options.monitorName = options.monitorName || "Unknown";
        this.options.websiteURL = options.websiteURL;
        this.options.interval = options.interval || 1000 * 60;
        this.options.maxTimeout = options.maxTimeout || 15000;
        this.options.options = options.options || {};
    }
    start() {
        super.emit("started", this.options);
        console.log(`[Monitor ${this.options.monitorName}] The monitor is now monitoring ${this.options.websiteURL}`);
        this.intervalManager = setInterval(async () => {
            try {
                setTimeout(() => {
                    return super.emit("timeout");
                }, (1000 * 15));
                let data = await node_fetch_1.default(this.options.websiteURL, this.options.options).catch((error) => {
                    return super.emit("down", (this.options, error));
                });
                const requestData = {
                    status: data.status,
                    statusText: data.statusText,
                    headers: data.headers,
                    data: data.json()
                };
                if (!this.options.includes(data.status)) {
                    return super.emit("error", (this.options, {
                        type: 0,
                        text: "The information returned does not contain a valid response code.",
                        acceptedHTTPCodes: this.options.acceptedHTTPCodes
                    }));
                }
                ;
                return super.emit("up", (this.options, requestData));
            }
            catch {
                return;
            }
        }, this.options.interval);
        return this.options;
    }
    stop() {
        clearInterval(this.intervalManager);
        super.emit("stopped", this.options);
        return true;
    }
    reload() {
        clearInterval(this.intervalManager);
        super.emit("reloading", this.options);
        this.start();
        super.emit("started", this.options);
    }
}
exports.default = Monitor;
