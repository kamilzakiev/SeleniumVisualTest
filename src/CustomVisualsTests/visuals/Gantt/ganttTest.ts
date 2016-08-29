import {WebdriverIO, webdriverIOHelpers, config, webdriverIOClientModule} from "../../_references";

describe("Gantt", config.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);
    
    beforeEach((done) => {
        client = webdriverIOHelpers.getWebClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("div.gantt-body g.task-group > g.task > *")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("selection test", function (done) {
        var visual = new clientVisuals.Gantt();
        clientHelpers.clickElement(visual.tasks.eq(0));
        clientHelpers.clickElement(visual.tasks.eq(1), true);

        visual.tasks.toArray().map($).forEach((e,i) => {
            if(i >= 2) {
                expect(parseFloat(e.css('opacity'))).toBeLessThan(1);
            } else {
                expect(parseFloat(e.css('opacity'))).toBe(1);
            }
        });

        setTimeout(() => {
            expect(clientHelpers.getTextWithoutChild($("svg.card > g > text.value"))).toBe("9");
            done();
        }, 500);
    });
}));