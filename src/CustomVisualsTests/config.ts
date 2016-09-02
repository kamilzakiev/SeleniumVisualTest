import {helpers} from "./_references";
import * as path from "path";
import * as fs from "fs";

export module config {
    (function init() {
        let configObj = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config.json"), "utf8"));
        _.merge(config, configObj);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTimeoutInterval;
    })();

    export var defaultTimeoutInterval: number;
}