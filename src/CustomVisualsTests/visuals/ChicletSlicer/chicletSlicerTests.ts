import {WebdriverIO, webdriverIOHelpers, visualConfig, webdriverIOClientModule, helpers} from "../../_references";

describe("ChicletSlicer", visualConfig.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebdriverIOClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("div.chicletSlicer div.cell > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.ChicletSlicer();
        var unselectedColor = visual.slicerItemContainers.eq(0).css('background-color');

        clientHelpers.clickElement(visual.slicerItemContainers.eq(0), true);
        clientHelpers.clickElement(visual.slicerItemContainers.eq(1), true);

        visual.slicerItemContainers.toArray().map($).forEach((e,i) => {
            clientHelpers.assertColorsMatch(e.css('background-color'), unselectedColor, i < 2);
        });

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "$159M")
            .then(done);
    });
}));