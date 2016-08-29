namespace clientVisuals {
	export class PulseChart {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.pulseChart").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement(): JQuery {
            return this.rootElement.children("svg.pulseChart");
        }

        public get gaps(): JQuery {
            return this.mainElement
                .children("g.gaps")
                .children("g.gap");
        }

        public get animationDot(): JQuery {
            return this.mainElement.children("g.dots").children("circle.animationDot");
        }

        public get chart(): JQuery {
            return this.mainElement.children("g.chart");
        }

        public get lineNode(): JQuery {
            return this.chart.children("g.lineNode");
        }

        public get lineContainer(): JQuery {
            return this.lineNode.children("g.lineContainer");
        }

        public get linePath() {
            return this.lineContainer.children("path.line");
        }

        public get dotsContainer(): JQuery {
            return this.lineNode.children("g.dotsContainer");
        }

        public get dotsContainerDot(): JQuery {
            return this.dotsContainer.children("circle.dot");
        }

        public get xAxisNode(): JQuery {
            return this.lineNode.children("g.xAxisNode");
        }

        public get xAxisNodeTick(): JQuery {
            return this.xAxisNode.children("g.tick");
        }

        public get yAxis(): JQuery {
            return this.mainElement.children("g.y.axis");
        }

        public get yAxisTicks(): JQuery {
            return this.yAxis.children("g.tick");
        }

        public get tooltipContainer(): JQuery {
            return this.lineNode.children("g.tooltipContainer");
        }

        public get tooltipContainerTooltip(): JQuery {
            return this.tooltipContainer.children("g.Tooltip");
        }

        public get animationPlay(): JQuery {
            return this.mainElement.children("g").children("g.animationPlay");
        }
	}
}