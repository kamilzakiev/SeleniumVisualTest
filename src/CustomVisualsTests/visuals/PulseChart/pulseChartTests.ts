import {WebdriverIO, webdriverIOHelpers, visualConfig, webdriverIOClientModule, helpers} from "../../_references";

describe("PulseChart", visualConfig.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebdriverIOClient(browser);
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

        clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "110.95")
            .then(done);
    });
}));