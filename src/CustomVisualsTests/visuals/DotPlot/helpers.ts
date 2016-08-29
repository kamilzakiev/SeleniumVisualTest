namespace clientVisuals {
	export class DotPlot {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.dotplot").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement() {
            return this.rootElement.find("svg.dotplot");
        }

        public get dataLabels() {
            return this.mainElement.children("g.labels").children("text.data-labels");
        }

        public get axisGraphicsContext() {
            return this.mainElement.children("g.axisGraphicsContext");
        }

        public get xAxis() {
            return this.axisGraphicsContext.children("g.x.axis");
        }

        public get xAxisLabel() {
            return this.xAxis.children("text.xAxisLabel");
        }

        public get dotGroups() {
            return this.mainElement.children("g.dotplotSelector").children("g.dotplotGroup");
        }

        public get dots() {
            return this.dotGroups.children("circle.circleSelector");
        }

        public get xAxisTicks() {
            return this.xAxis.children("g.tick");
        }
	}
}