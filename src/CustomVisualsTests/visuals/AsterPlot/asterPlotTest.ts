import {WebdriverIO, webdriverIOHelpers, config} from "../../_references";

describe("AsterPlot", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .init()
            .url(reportUrl)
            .waitForVisible("svg.asterPlot")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    it("selection test", (done) => {
        const selector = "g.asterSlices";

        client
            .waitForVisible(selector)
            .call(webdriverIOHelpers.click(selector + " :nth-child(1)", true))
            .call(webdriverIOHelpers.click(selector + " :nth-child(2)", true))
            .getCssProperty(selector + " :nth-child(n + 0)", 'fill-opacity')
            .then((elements: WebdriverIO.CssProperty[]) => {
                elements.forEach((e,i) => {
                    if(i >= 2) {
                        expect(parseFloat(e.value)).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.value)).toBe(1);
                    }
                });
            })
            .pause(1000)
            .call(webdriverIOHelpers.getTextWithoutChild("svg.card > g > text.value"))
            .then(e => {
                expect(e).toBe("2.47K");
                done();
            });
    });
}));