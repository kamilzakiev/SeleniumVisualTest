import * as references from "./_references";
import * as fs from "fs";
import Browser = references.webDriverIOHelper.Browser;

export module config {
    export interface VisualTestConfig {
        browsers: {
            internetExplorer: boolean;
            chrome: boolean;
            firefox: boolean;
            edge: boolean;
        };            
        reports: {
            dxt: string,
            msit: string,
            prod: string
        }
    }

    export function readFromDirectory(configPath: string) {
        let json = fs.readFileSync(configPath + "/config.json", "utf8");
        let config = JSON.parse(json);
        return <VisualTestConfig>config;
    }

    export function getSpecs(
        configPath: string,
        specs: (browser: Browser, reportUrl: string) => void): () => void {

        let visualTestConfig = readFromDirectory(configPath);
        if(!visualTestConfig || !visualTestConfig.browsers || !visualTestConfig.reports) {
            return;
        }

        for(let browser of getBrowserList(visualTestConfig)) {
            for(let reportKey in visualTestConfig.reports) {
                let url = visualTestConfig.reports[reportKey];
                if(!url) {
                    continue;
                }

                specs(browser, url);
            }
        }

        function getBrowserList(visualTestConfig: VisualTestConfig) {
            if(!references.helpers.isAppveyor()) {
                return [Browser.chrome];
            }

            return Object.keys(visualTestConfig.browsers)
                .filter(key => visualTestConfig.browsers[key])
                .map(key => {
                    switch(key) {
                        case "chrome": return Browser.chrome;
                        case "firefox": return Browser.firefox;
                        case "internetExplorer": return Browser.internetExplorer;
                        //case "edge": return references.WebDriverIOHelper.Browser.edge;
                    }
                });
        }
    }
}