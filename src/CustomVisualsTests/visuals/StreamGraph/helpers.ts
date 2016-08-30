namespace clientVisuals {
	export class StreamGraph {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.streamGraph").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement(): JQuery {
            return this.rootElement.children("svg.streamGraph");
        }

        public get axisGraphicsContext(): JQuery {
            return this.mainElement.children("g.axisGraphicsContext");
        }

        public get xAxisTicks(): JQuery {
            return this.axisGraphicsContext.children("g.x.axis").children("g.tick");
        }

        public get yAxisTicks(): JQuery {
            return this.axisGraphicsContext.children("g.y.axis").children("g.tick");
        }

        public get xAxisLabel(): JQuery {
            return this.axisGraphicsContext.children("text.xAxisLabel");
        }

        public get yAxisLabel(): JQuery {
            return this.axisGraphicsContext.children("text.yAxisLabel");
        }

        public get dataLabelsText(): JQuery {
            return this.mainElement
                .children("g.labels")
                .children("text.data-labels");
        }

        public get layers(): JQuery {
            return this.mainElement
                .children("g.dataPointsContainer")
                .children("path.layer");
        }

        public get legendGroup(): JQuery {
            return this.rootElement
                .children("svg.legend")
                .children("g#legendGroup");
        }

        public get legendOrientation(): string {
            return this.rootElement
                .children("svg.legend")
                .attr("orientation");
        }

        public get legendWidth(): number {
            return this.rootElement
                .children("svg.legend")
                .width();
        }

        public get legendTitle(): JQuery {
            return this.legendGroup.children(".legendTitle");
        }

        public get legendItemText(): JQuery {
            return this.legendGroup.children(".legendItem").children("text.legendText");
        }
	}
}