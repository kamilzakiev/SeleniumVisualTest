import {WebdriverIO, webdriverIOHelpers, visualConfig, webdriverIOClientModule, helpers} from "../../_references";

describe("SandDance", visualConfig.getSpecs(__dirname, (browser, reportUrl) => {
    let client: WebdriverIO.Client<void>;
    let clientModule: webdriverIOClientModule = new webdriverIOClientModule([__dirname + "/helpers.js"], function() {
    });
    let itClient = clientModule.getItClient(() => client), xitClient = clientModule.getXitClient(() => client);

    beforeEach((done) => {
        client = webdriverIOHelpers.getWebdriverIOClient(browser);
        client
            .url(reportUrl)
            .waitForVisible("div.sandDance canvas.canvas3d + canvas.canvas2d")
            .then(() => done());
    });

    afterEach((done) => client.endAll().finally(() => done()));

    itClient("dom validation tests", function (done) {
        var visual = new clientVisuals.SandDance();
        setTimeout(() => {
            var gl = visual.getCanvas3dContext();

            expect(gl.checkFramebufferStatus(gl.FRAMEBUFFER)).toBe(gl.FRAMEBUFFER_COMPLETE);
            expect(gl.drawingBufferWidth).toBeGreaterThan(100);
            expect(gl.drawingBufferHeight).toBeGreaterThan(100);

            var size = { width: 50, height: 50 };
            var pixels = new Uint8Array(size.width * size.height * 4);
            gl.readPixels(
                gl.drawingBufferWidth/2,
                gl.drawingBufferHeight/2,
                size.width,
                size.height,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                pixels);

            expect(_.uniq(pixels).length).toBeGreaterThan(0);

            done();
        }, 5000);
    });
}));