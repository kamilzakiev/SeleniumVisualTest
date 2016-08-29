import {WebdriverIO, webdriverIOHelpers, config, webdriverIOClientModule} from "../../_references";

describe("ChicletSlicer", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
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

        setTimeout(() => {
            expect(clientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("$159M");
            done();
        }, 500);
    });
}));