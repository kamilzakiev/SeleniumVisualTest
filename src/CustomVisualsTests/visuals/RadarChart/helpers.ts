namespace clientVisuals {
	export class RadarChart {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.radarChart").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

		public get mainElement() {
            return this.rootElement.children("svg.radarChart");
        }

        public get chart() {
            return this.mainElement
                .children("g")
                .children("g.chart");
        }

        public get chartPolygons() {
            return this.chart
                .children("g.chartArea")
                .children("polygon.chartPolygon");
        }

        public get dataLabelsText() {
            return this.mainElement
                .children("g")
                .children("g.labels")
                .children("text.data-labels");
        }

        public get legendGroup() {
            return this.rootElement
                .children("svg.legend")
                .children("g#legendGroup");
        }

        public get legendTitle() {
            return this.legendGroup.children(".legendTitle");
        }

        public get legendItemText() {
            return this.legendGroup
                .children(".legendItem")
                .children("text.legendText");
        }

        public get chartNodes() {
            return this.chart.children("g.chartNode");
        }

        public get chartDotsGrouped(): JQuery[] {
            return this.chartNodes.toArray().map($).map(e => e.children("circle.chartDot"));
        }
	}
}