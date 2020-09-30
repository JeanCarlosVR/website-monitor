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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Nb25pdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLDREQUErQjtBQUUvQixNQUFxQixPQUFRLFNBQVEsZ0JBQU0sQ0FBQyxZQUFZO0lBS3BELFlBQW1CLE9BT2xCO1FBQ0csS0FBSyxFQUFFLENBQUM7UUFFUixJQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUUzRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxTQUFTLENBQUM7UUFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVNLEtBQUs7UUFDUixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxtQ0FBbUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRTlHLElBQUksQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQzFDLElBQUk7Z0JBQ0EsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDWixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2pDLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVoQixJQUFJLElBQUksR0FBRyxNQUFNLG9CQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDbEYsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDckQsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxXQUFXLEdBQUc7b0JBQ2hCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO29CQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO2lCQUNwQixDQUFDO2dCQUVGLElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ3BDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO3dCQUN0QyxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxJQUFJLEVBQUUsa0VBQWtFO3dCQUN4RSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQjtxQkFDcEQsQ0FBQyxDQUFDLENBQUM7aUJBQ1A7Z0JBQUEsQ0FBQztnQkFFRixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFBO2FBQ3ZEO1lBQUMsTUFBTTtnQkFDSixPQUFPO2FBQ1Y7UUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUxQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVNLElBQUk7UUFDUCxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVwQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sTUFBTTtRQUNULGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0o7QUE5RUQsMEJBOEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV2ZW50cyBmcm9tICdldmVudHMnO1xyXG5pbXBvcnQgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25pdG9yIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XHJcblxyXG4gICAgcHJvdGVjdGVkIGludGVydmFsTWFuYWdlcjtcclxuICAgIHByb3RlY3RlZCBvcHRpb25zO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiB7XHJcbiAgICAgICAgd2Vic2l0ZVVSTDogICAgICAgICBzdHJpbmcsXHJcbiAgICAgICAgbW9uaXRvck5hbWU6ICAgICAgICBzdHJpbmcsXHJcbiAgICAgICAgaW50ZXJ2YWw6ICAgICAgICAgICBudW1iZXIsXHJcbiAgICAgICAgbWF4VGltZW91dDogICAgICAgICBudW1iZXIsXHJcbiAgICAgICAgYWNjZXB0ZWRIVFRQQ29kZXM6ICBudW1iZXJbXSxcclxuICAgICAgICBvcHRpb25zPzogICAgICAgICAgIG9iamVjdFxyXG4gICAgfSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIGlmKCEob3B0aW9ucyB8fCBvcHRpb25zLndlYnNpdGVVUkwpKSB0aHJvdyBuZXcgRXJyb3IoXCJbTW9uaXRvcl0gVGhlIHBhcmFtZXRlciAod2Vic2l0ZVVSTCkgaXMgdW5kZWZpbmVkLlwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gbmV3IE9iamVjdCgpO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5tb25pdG9yTmFtZSA9IG9wdGlvbnMubW9uaXRvck5hbWUgfHwgXCJVbmtub3duXCI7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLndlYnNpdGVVUkwgPSBvcHRpb25zLndlYnNpdGVVUkw7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmludGVydmFsID0gb3B0aW9ucy5pbnRlcnZhbCB8fCAxMDAwICogNjA7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLm1heFRpbWVvdXQgPSBvcHRpb25zLm1heFRpbWVvdXQgfHwgMTUwMDA7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLm9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnMgfHwge307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCk6IFByb21pc2U8b2JqZWN0PiB7XHJcbiAgICAgICAgc3VwZXIuZW1pdChcInN0YXJ0ZWRcIiwgdGhpcy5vcHRpb25zKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYFtNb25pdG9yICR7dGhpcy5vcHRpb25zLm1vbml0b3JOYW1lfV0gVGhlIG1vbml0b3IgaXMgbm93IG1vbml0b3JpbmcgJHt0aGlzLm9wdGlvbnMud2Vic2l0ZVVSTH1gKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbE1hbmFnZXIgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZW1pdChcInRpbWVvdXRcIik7XHJcbiAgICAgICAgICAgICAgICB9LCAoMTAwMCAqIDE1KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaCh0aGlzLm9wdGlvbnMud2Vic2l0ZVVSTCwgdGhpcy5vcHRpb25zLm9wdGlvbnMpLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5lbWl0KFwiZG93blwiLCAodGhpcy5vcHRpb25zLCBlcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiBkYXRhLnN0YXR1c1RleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogZGF0YS5oZWFkZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuanNvbigpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLm9wdGlvbnMuaW5jbHVkZXMoZGF0YS5zdGF0dXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmVtaXQoXCJlcnJvclwiLCAodGhpcy5vcHRpb25zLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiVGhlIGluZm9ybWF0aW9uIHJldHVybmVkIGRvZXMgbm90IGNvbnRhaW4gYSB2YWxpZCByZXNwb25zZSBjb2RlLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHRlZEhUVFBDb2RlczogdGhpcy5vcHRpb25zLmFjY2VwdGVkSFRUUENvZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZW1pdChcInVwXCIsICh0aGlzLm9wdGlvbnMsIHJlcXVlc3REYXRhKSlcclxuICAgICAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbE1hbmFnZXIpO1xyXG4gICAgICAgIHN1cGVyLmVtaXQoXCJzdG9wcGVkXCIsIHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWxvYWQoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsTWFuYWdlcik7XHJcbiAgICAgICAgc3VwZXIuZW1pdChcInJlbG9hZGluZ1wiLCB0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0KCk7XHJcbiAgICAgICAgc3VwZXIuZW1pdChcInN0YXJ0ZWRcIiwgdGhpcy5vcHRpb25zKTtcclxuICAgIH1cclxufSJdfQ==