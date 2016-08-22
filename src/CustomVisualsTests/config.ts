import * as references from "./_references";
import * as fs from "fs";

export module config {
    export interface VisualTestConfig {
        name: string;
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

    export let tests: VisualTestConfig[] = [];

    (function init() {
        let json = fs.readFileSync("./config.json", "utf8");
        let config = JSON.parse(json);
        (<any[]>config.tests).forEach(x => tests.push(x));
    })();

    export function getVisualTestByName(name: string) {
        return tests.filter(x => x.name.toLowerCase() === name.toLowerCase())[0];
    }

    export function getSpecsForVisual(
        name: string,
        specs: (name: string, browser: references.WebDriverIOHelper.Browser, reportUrl: string) => void): () => void {

        let visualTestConfig = getVisualTestByName(name);
        if(!visualTestConfig || !visualTestConfig.browsers || !visualTestConfig.reports) {
            return;
        }

        for(let browser of getBrowserList(visualTestConfig)) {
            for(let reportKey in visualTestConfig.reports) {
                let url = visualTestConfig.reports[reportKey];
                if(!url) {
                    continue;
                }

                console.log(`Added spec for visual: '${name}', browser: '${browser}', report: '${reportKey}'.`); 

                specs(name, browser, url);
            }
        }

        function getBrowserList(visualTestConfig: VisualTestConfig) {
            return Object.keys(visualTestConfig.browsers)
                .filter(key => visualTestConfig.browsers[key])
                .map(key => {
                    switch(key) {
                        case "chrome": return references.WebDriverIOHelper.Browser.chrome;
                        case "firefox": return references.WebDriverIOHelper.Browser.firefox;
                        case "internetExplorer": return references.WebDriverIOHelper.Browser.internetExplorer;
                        case "edge": return references.WebDriverIOHelper.Browser.edge;
                    }
                });
        }
    }
}