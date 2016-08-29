namespace clientVisuals {
	export class AreaRangeChart {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.areaRangeChart").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement() {
            return this.rootElement.children("svg.areaRangeChart");
        }

        public get areas() {
            return this.mainElement
                .children("g.chart")
                .children("path.area");
        }
	}
}