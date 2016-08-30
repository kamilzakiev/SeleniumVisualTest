import {WebdriverIO, webdriverIOHelpers, visualConfig, webdriverIOClientModule} from "../../_references";

describe("TornadoChart", visualConfig.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.tornado-chart g.columns > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.TornadoChart();
        clientHelpers.clickElement(visual.columns.eq(0));
        clientHelpers.clickElement(visual.columns.eq(1), true);

        visual.columns.toArray().map($).forEach((e,i) => {
            if(i % (visual.columns.length/2) >= 2) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        setTimeout(() => {
            expect(clientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("82.40K");
            done();
        }, 500);
    });
}));