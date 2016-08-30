import {WebdriverIO, webdriverIOHelpers, visualConfig, webdriverIOClientModule} from "../../_references";

describe("WordCloud", visualConfig.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.wordCloud g.words > g.word > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.WordCloud();
        clientHelpers.clickElement(visual.getWordRectByText("visualize"));
        clientHelpers.clickElement(visual.getWordRectByText("data"), true);

        visual.wordRects.toArray().map(e => $(e).siblings()).forEach((e,i) => {
            if(e.text() === "visualize" || e.text() === "data") {
                expect(parseFloat(e.css('fill-opacity'))).toBe(1);
            } else {
                expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
            }
        });

        setTimeout(() => {
            expect(clientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("6");
            done();
        }, 500);
    });
}));