import {WebdriverIO, webdriverIOHelpers, visualConfig, webdriverIOClientModule} from "../../_references";

describe("Timeline", visualConfig.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.timeline g.cursorsArea > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.Timeline();
        clientHelpers.clickElement(visual.cellRects.eq(0));

        var firstCell = visual.cellRects.eq(0);
        var selectionColor = firstCell.css('fill');

        visual.cellRects.toArray().map($).forEach(e => {
            clientHelpers.assertColorsMatch(e.css('fill'), selectionColor, !e.is(firstCell));
        });

        setTimeout(() => {
            expect(clientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("$46.22K");
            done();
        }, 500);
    });
}));