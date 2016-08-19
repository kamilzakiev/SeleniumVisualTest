import * as references from "../_references";

describe("AsterPlot", () => {
    const reportUrl = "https://msit.powerbi.com/view?r=eyJrIjoiZGVmNjUyZmItODIxMC00MzI0LWE4ZDAtNzIxZGY5NzhjZGFlIiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9";
    let client: WebdriverIO.Client<void>;

    beforeEach((done) => {
        client = references.WebDriverIOHelper.getWebClient(references.WebDriverIOHelper.Browser.chrome);
        client
            .init()
            .url(reportUrl)
            .waitForVisible("svg.asterPlot")
            .then(() => done());
    });

    afterEach((done) => client.end().then(() => done()));

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