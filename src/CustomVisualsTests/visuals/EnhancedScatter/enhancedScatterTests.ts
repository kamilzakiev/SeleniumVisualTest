import {WebdriverIO, webdriverIOHelpers, config, webdriverIOClientModule} from "../../_references";

describe("EnhancedScatter", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.enhancedScatterChart > svg.svgScrollable svg > g.ScatterMarkers > * ")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.EnhancedScatter();
        clientHelpers.clickElement(visual.dots.eq(0));

        visual.dots.toArray().map($).forEach((e,i) => {
            if(i >= 1) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(0.85);
            }
        });

        setTimeout(() => {
            expect(clientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("10");
            done();
        }, 500);
    });
}));