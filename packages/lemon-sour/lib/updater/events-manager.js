"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_event_1 = require("./app-event");
const event_names_enum_1 = require("../enum/event-names-enum");
const _ = __importStar(require("lodash"));
/**
 * EventsManager
 */
class EventsManager {
    constructor(events) {
        this.checkingForUpdate = this.makeAppEvent(events, event_names_enum_1.EventNamesEnum.CheckingForUpdate);
        this.updateNotAvailable = this.makeAppEvent(events, event_names_enum_1.EventNamesEnum.UpdateNotAvailable);
        this.updateAvailable = this.makeAppEvent(events, event_names_enum_1.EventNamesEnum.UpdateAvailable);
        this.downloadProgress = this.makeAppEvent(events, event_names_enum_1.EventNamesEnum.DownloadProgress);
        this.updateDownloaded = this.makeAppEvent(events, event_names_enum_1.EventNamesEnum.UpdateDownload);
        this.error = this.makeAppEvent(events, event_names_enum_1.EventNamesEnum.Error);
    }
    makeAppEvent(events, eventName) {
        const appEvent = new app_event_1.AppEvent(eventName);
        const event = events[eventName];
        // イベントで何も処理をしない場合
        if (!event || !event.steps) {
            return appEvent;
        }
        _.forEach(event.steps, (value, index) => {
            const run = value.run;
            appEvent.add(run.name, run.command, run.sync);
        });
        return appEvent;
    }
}
exports.EventsManager = EventsManager;
