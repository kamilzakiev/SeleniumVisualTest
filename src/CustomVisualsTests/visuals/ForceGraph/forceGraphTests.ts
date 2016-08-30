import {WebdriverIO, webdriverIOHelpers, config, webdriverIOClientModule} from "../../_references";

describe("ForceGraph", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
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