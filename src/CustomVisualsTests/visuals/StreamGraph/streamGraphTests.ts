import {WebdriverIO, webdriverIOHelpers, visualConfig, webdriverIOClientModule} from "../../_references";

describe("StreamGraph", visualConfig.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.streamGraph g.dataPointsContainer > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.StreamGraph();
        clientHelpers.clickElement(visual.layers.eq(0));
        clientHelpers.clickElement(visual.layers.eq(1), true);

        visual.layers.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        setTimeout(() => {
            expect(clientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("191.60");
            done();
        }, 500);
    });
}));