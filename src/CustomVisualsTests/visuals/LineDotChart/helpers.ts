namespace clientVisuals {
	export class LineDotChart {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.lineDotChart").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement(): JQuery {
            return this.rootElement.children("svg.lineDotChart");
        }

        public get line() {
            return this.mainElement
                .children("g")
                .children("g.line");
        }

        public get dots() {
            return this.line
                .children("g.dot-points")
                .children("circle.point");
        }
	}
}