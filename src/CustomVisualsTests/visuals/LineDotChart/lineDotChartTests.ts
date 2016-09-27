import {WebdriverIO, webdriverIOHelpers, visualConfig, webdriverIOClientModule, helpers} from "../../_references";

describe("LineDotChart", visualConfig.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebdriverIOClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.lineDotChart g.line circle.point")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.LineDotChart();
        clientHelpers.clickElement(visual.dots.eq(0));

        setTimeout(() => {
            visual.dots.toArray().map($).forEach((e,i) => {
                if(i >= 1) {
                    expect(e).not.toHaveCss({"opacity":"1"});
                } else {
                    expect(e).toHaveCss({"opacity":"1"});
                }
            });
        }, 5000);

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "1")
            .then(done);
    });
}));