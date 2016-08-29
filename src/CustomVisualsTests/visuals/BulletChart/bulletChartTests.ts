import {WebdriverIO, webdriverIOHelpers, config, webdriverIOClientModule} from "../../_references";

describe("BulletChart", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("div.bulletChart rect.range")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.BulletChart();

        clientHelpers.clickElement(visual.rangeRectsGrouped[0].first());
        clientHelpers.clickElement(visual.rangeRectsGrouped[1].first(), true);

        visual.rangeRectsGrouped.map(e => e.first()).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('opacity'))).toBe(1);
            }
        });

        setTimeout(() => {
            expect(clientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("222K");
            done();
        }, 500);
    });
}));