namespace clientVisuals {
	export class SandDance {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("div.sandDance").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement() {
            return this.rootElement.children("div.sandDance");
        }

        public get canvas3d() {
            return this.mainElement
                .children("div")
                .children("div")
                .children("canvas.canvas3d");
        }

        public getCanvas3dContext(): WebGLRenderingContext {
            var canvas = <HTMLCanvasElement>this.canvas3d.get(0);
            return <any>canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        }
	}
}