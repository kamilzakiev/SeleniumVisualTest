namespace clientVisuals {
	export class MekkoChart {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement() {
            return this.rootElement
                .children("svg")
                .children("g.axisGraphicsContext")
                .parent();
        }

        public get categoriesAxis() {
            return this.mainElement
                .children("g.axisGraphicsContext")
                .children("g.x.axis.showLinesOnAxis");
        }

        public get categoriesAxisTicks() {
            return this.categoriesAxis.children("g.tick");
        }

        public get rootAxisGraphicsContext() {
            return this.mainElement.children("g.axisGraphicsContext");
        }

        public get svgScrollableAxisGraphicsContext() {
            return this.mainElement.children("svg.svgScrollable").children("g.axisGraphicsContext");
        }

        public get xAxisTicks() {
            return this.rootAxisGraphicsContext.children("g.x.axis").children("g.tick");
        }

        public get yAxisTicks() {
            return this.svgScrollableAxisGraphicsContext.children("g.y.axis").children("g.tick");
        }

        public get xAxisLabel() {
            return this.rootAxisGraphicsContext.children("text.xAxisLabel");
        }

        public get yAxisLabel() {
            return this.rootAxisGraphicsContext.children("text.yAxisLabel");
        }

        public get columnElement() {
            return this.mainElement.find("svg.svgScrollable g.axisGraphicsContext .columnChartMainGraphicsContext");
        }

        public get series() {
            return this.columnElement.children("g.series");
        }

        public get columns() {
            return this.series.children("rect.column");
        }

        public get borders() {
            return this.series.children("rect.mekkoborder");
        }

        public get dataLabels() {
            return this.mainElement
                .children("svg.svgScrollable")
                .children("g.labelGraphicsContext")
                .children("text.label");
        }

        public get columnsWithSize() {
            return this.series.children("rect.column").filter((i,e) => parseFloat($(e).attr("height")) > 0);
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
            return this.legendGroup.children(".legendItem").children("text.legendText");
        }
	}
}