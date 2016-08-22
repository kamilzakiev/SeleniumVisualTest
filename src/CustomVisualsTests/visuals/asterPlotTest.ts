import * as references from "../_references";

references.config.getSpecsForVisual("AsterPlot", (name, browser, reportUrl) => {
    describe(name + " - " + browser, () => {
        let client: WebdriverIO.Client<void>;

        beforeEach((done) => {
            client = references.WebDriverIOHelper.getWebClient(browser);
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
                .click(selector + " :nth-child(1)")
                .getCssProperty(selector + " :nth-child(n + 2)", 'fill-opacity')
                .then((elements: WebdriverIO.CssProperty[]) => {
                    elements.forEach(e => {
                        expect(parseFloat(e.value)).toBeLessThan(1);
                    });

                    done();
                });
        });
    });
});