import {WebdriverIO, webdriverIOHelpers, visualConfig, webdriverIOClientModule, helpers} from "../../_references";

describe("ForceGraph", visualConfig.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebdriverIOClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("svg.forceGraph > g.node > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("dom validation tests", function () {
        var visual = new clientVisuals.ForceGraph();
        expect(visual.nodes).toBeInDOM();
        expect(visual.nodeTexts).toBeInDOM();
        expect(visual.nodes.children("circle")).toBeInDOM();
        expect(visual.links).toBeInDOM();
    });
}));