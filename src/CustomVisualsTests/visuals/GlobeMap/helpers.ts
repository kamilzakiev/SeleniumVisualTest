namespace clientVisuals {
	export class GlobeMap {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("div > div + div > canvas").parent().parent().parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement() {
            return this.rootElement.children("div");
        }

        public get canvas() {
            return this.mainElement
                .children("div")
                .children("canvas");
        }

        public getCanvasContext(): WebGLRenderingContext {
            var canvas = <HTMLCanvasElement>this.canvas.get(0);
            return <any>canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        }
	}
}