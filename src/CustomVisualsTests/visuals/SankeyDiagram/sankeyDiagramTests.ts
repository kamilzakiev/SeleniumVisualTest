import {WebdriverIO, webdriverIOHelpers, visualConfig, webdriverIOClientModule, helpers} from "../../_references";

describe("SankeyDiagram", visualConfig.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebdriverIOClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.sankeyDiagram g.links > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.SankeyDiagram();
        clientHelpers.clickElement(visual.linkElements.eq(0));
        clientHelpers.clickElement(visual.linkElements.eq(1), true);

        visual.linkElements.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(e.is(".selected")).toBeFalsy();
            } else {
                expect(e.is(".selected")).toBeTruthy();
            }
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "9")
            .then(done);
    });
}));