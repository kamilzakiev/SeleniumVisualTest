namespace clientVisuals {
	export class BulletChart {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("div.bulletChart").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

		public get mainElement() {
            return this.rootElement.children("div").children("svg");
        }

        public get valueRects() {
            return this.mainElement.children("g").children("rect.value");
        }

        public get rangeRects() {
            return this.mainElement.children("g").children("rect.range");
        }

        public get axis() {
            return this.mainElement.children("g").children("g").children("g.axis");
        }

        public get categoryLabels() {
            return this.mainElement.children("g").children("text.title");
        }

        public get measureUnits() {
            return this.mainElement.children("g").children("text").not(".title");
        }

        public get rangeRectsGrouped(): JQuery[] {
            let groupBy = this.isVertical ? 'x' : 'y';
            let grouped = _.groupBy(this.rangeRects.toArray(), e => $(e).attr(groupBy));
            let groups = _.keys(grouped).map(x => $(grouped[x]));
            return groups;
        }

        //TODO
        public get isVertical(): boolean {
            return false;
        }
	}
}