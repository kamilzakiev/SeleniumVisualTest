import {WebdriverIO, webdriverIOHelpers, visualConfig, webdriverIOClientModule, helpers} from "../../_references";
import * as Path from "path";

describe("SandboxedVisual", visualConfig.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([Path.join(__dirname, "../TornadoChart/helpers.js")], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebdriverIOClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("iframe.visual-sandbox")
            .element("iframe.visual-sandbox").then((res) => client.frame(res.value)) // Selects the sandbox iframe.
            .waitForVisible("svg.tornado-chart g.columns > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    it("selection test", (done) => {
        client
            .call(clientModule.execSpec(function(done) {
                var visual = new clientVisuals.TornadoChart();

                clientHelpers.clickElement(visual.columns.eq(3));

                visual.columns.toArray().map($).forEach((e,i) => {
                    if(i !== 3) {
                        expect(parseFloat(e.css('fill-opacity'))).toBeLessThan(1);
                    } else {
                        expect(parseFloat(e.css('fill-opacity'))).toBe(1);
                    }
                });

                done();
            }))
            .frameParent() // Switches to the main frame with unsadnboxed visuals.
            .then(clientModule.execSpec(function(done) {
                clientHelpers.waitUntil(() => clientHelpers.getTextWithoutChild($("svg.card > g > text.value")) === "0.09")
                    .then(done);
            }))
            .then(() => done());
    });
}));