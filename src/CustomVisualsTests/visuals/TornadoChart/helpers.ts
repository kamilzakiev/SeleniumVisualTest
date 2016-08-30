namespace clientVisuals {
	export class TornadoChart {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.tornado-chart").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement() {
            return this.rootElement.children("svg.tornado-chart");
        }

        public get scrollable() {
            return this.rootElement.children("svg.tornado-chart").children("g");
        }

        public get scrollbar() {
            return this.mainElement.children("g.y.brush");
        }

        public get scrollbarRect() {
            return this.scrollbar.children("rect.extent");
        }

        public get categories() {
            return this.scrollable.children("g.categories").children("g.category");
        }

        public get axis() {
            return this.scrollable.children("g.axes").children("line.axis");
        }

        public get columns() {
            return this.scrollable.children("g.columns").children("rect.column");
        }

        public get labels() {
            return this.scrollable.children("g.labels").children("g.label");
        }
	}
}