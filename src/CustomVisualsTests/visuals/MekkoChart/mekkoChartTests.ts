import {WebdriverIO, webdriverIOHelpers, config, webdriverIOClientModule} from "../../_references";

describe("MekkoChart", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);
 
    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg svg.columnChartMainGraphicsContext > g.series > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.MekkoChart();
        clientHelpers.clickElement(visual.columnsWithSize.eq(0));
        clientHelpers.clickElement(visual.columnsWithSize.eq(1), true);

        visual.columnsWithSize.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });

        setTimeout(() => {
            expect(clientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("138K");
            done();
        }, 500);
    });
}));