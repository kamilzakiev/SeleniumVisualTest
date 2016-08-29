namespace clientVisuals {
	export class AsterPlot {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.asterPlot").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

		public get mainElement() {
            return this.rootElement.children("svg");
        }

		public get slices() {
            return this.mainElement
                .children("g")
                .children("g.asterSlices")
                .children("path.asterSlice");
        }
	}
}