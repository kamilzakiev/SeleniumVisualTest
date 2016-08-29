import {WebdriverIO, webdriverIOHelpers, config, webdriverIOClientModule} from "../../_references";

describe("PulseChart", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.pulseChart g.dotsContainer > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.PulseChart();
        clientHelpers.clickElement(visual.dotsContainerDot.eq(0));
        clientHelpers.clickElement(visual.dotsContainerDot.eq(1), true);

        expect(visual.tooltipContainerTooltip.eq(0)).toBeInDOM();
        expect(visual.tooltipContainerTooltip.eq(1)).toBeInDOM();

        setTimeout(() => {
            expect(clientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("110.95");
            done();
        }, 500);
    });
}));