import {WebdriverIO, webdriverIOHelpers, config} from "../../_references";

describe("Histogram", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .init()
            .url(reportUrl)
            .waitForVisible("svg.histogram")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    it("selection test", (done) => {
        const selector = "svg.histogram g.columns";

        client
            .waitForVisible(selector)
            .call(webdriverIOHelpers.click(selector + " :nth-child(1)"))
            .getCssProperty(selector + " :nth-child(n + 0)", 'fill-opacity')
            .then((elements: WebdriverIO.CssProperty[]) => {
                elements.forEach((e,i) => {
                    if(i >= 1) {
                        expect(parseFloat(e.value)).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.value)).toBe(1);
                    }
                });
            })
            .pause(1000)
            .call(webdriverIOHelpers.getTextWithoutChild("svg.card > g > text.value"))
            .then(e => {
                expect(e).toBe("7");
                done();
            });
    });
}));