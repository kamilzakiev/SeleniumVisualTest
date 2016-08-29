import {WebdriverIO, webdriverIOHelpers, config, webdriverIOClientModule} from "../../_references";

xdescribe("AreaRangeChart", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.areaRangeChart > g.chart > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.AreaRangeChart();
        console.log(visual.rootElement.length);
        clientHelpers.clickElement(visual.areas.eq(0));

        visual.areas.toArray().map($).forEach((e,i) => {
            if(i >= 1) {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            }
        });
        done();
        setTimeout(() => {
            expect(clientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("299");
            done();
        }, 500);
    });
}));