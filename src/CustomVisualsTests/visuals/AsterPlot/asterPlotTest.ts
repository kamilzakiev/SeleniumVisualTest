import {WebdriverIO, webdriverIOHelpers, config, webdriverIOClientModule} from "../../_references";

describe("AsterPlot", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    
    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.asterPlot g.asterSlices")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    it("selection test", (done) => {
        client.call(clientModule.execSpec(function (done) {
            var visual = new clientModules.AsterPlot();
            clientModules.helpers.clickElement(visual.slices.eq(0), true);
            clientModules.helpers.clickElement(visual.slices.eq(1), true);

            visual.slices.toArray().map($).forEach((e,i) => {
                if(i >= 2) {
                    expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
                } else {
                    expect(parseFloat(e.css('fill-opacity'))).toBe(1);
                }
            });

            setTimeout(() => {
                expect(clientModules.helpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("2.47K");
                done();
            }, 500);
        }))
        .then(() => done());
    });
}));