namespace clientVisuals {
	export class EnhancedScatter {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.enhancedScatterChart").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement(): JQuery {
            return this.rootElement
                .children("svg")
                .children("g.axisGraphicsContext")
                .parent();
        }

        public get axisGraphicsContext() {
            return this.mainElement.children("g.axisGraphicsContext");
        }

        public get backdropImage() {
            return this.axisGraphicsContext.children("image");
        }

        public get xAxis() {
            return this.axisGraphicsContext.children("g.x.axis");
        }

        public get xAxisTicks() {
            return this.xAxis.children("g.tick");
        }

        public get xAxisLabel() {
            return this.axisGraphicsContext.children("text.xAxisLabel");
        }

        public get yAxis() {
            return this.svgScrollableAxisGraphicsContext.children("g.y.axis");
        }

        public get yAxisTicks() {
            return this.yAxis.children("g.tick");
        }

        public get yAxisLabel() {
            return this.axisGraphicsContext.children("text.yAxisLabel");
        }

        public get svgScrollableAxisGraphicsContext(): JQuery {
            return this.mainElement
                .children("svg.svgScrollable")
                .children("g.axisGraphicsContext");
        }

        public get mainGraphicsContext(): JQuery {
            return this.svgScrollableAxisGraphicsContext
                .children("g.mainGraphicsContext");
        }

        public get dataLabels(): JQuery {
            return this.mainGraphicsContext
                .children("g.labels");
        }

        public get dataLabelsText(): JQuery {
            return this.dataLabels
                .children("text.data-labels");
        }

        public get crosshair() {
            return this.mainGraphicsContext
                .children("svg")
                .children("g.crosshairCanvas");
        }

        public get dots() {
            return this.mainGraphicsContext
                .children("svg")
                .children("g.ScatterMarkers")
                .children("path.dot");
        }

        public get legendGroup(): JQuery {
            return this.rootElement
                .children(".legend")
                .children("#legendGroup");
        }

        public get legendTitle() {
            return this.legendGroup.children(".legendTitle");
        }

        public get legendItemText() {
            return this.legendGroup.children(".legendItem").children("text.legendText");
        }

        public getMarkers(): JQuery {
            return $(".scatterChart .mainGraphicsContext circle.dot");
        }
	}
}