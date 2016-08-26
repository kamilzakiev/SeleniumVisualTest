import {WebdriverIO, webdriverIOHelpers, config, webdriverIOClientModule} from "../../_references";

describe("Histogram", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.histogram g.columns > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    it("selection test", (done) => {
        client.call(clientModule.execSpec(function (done) {
            var visual = new clientModules.Histogram();
            clientModules.helpers.clickElement(visual.columnRects.eq(0), true);

            visual.columnRects.toArray().map($).forEach((e,i) => {
                if(i >= 1) {
                    expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
                } else {
                    expect(parseFloat(e.css('fill-opacity'))).toBe(1);
                }
            });

            setTimeout(() => {
                expect(clientModules.helpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("7");
                done();
            }, 500);
        }))
        .then(() => done());
    });
}));