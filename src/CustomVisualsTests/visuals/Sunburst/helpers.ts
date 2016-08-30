namespace clientVisuals {
	export class Sunburst {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.mainDrawArea").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

		public get mainElement() {
            return this.rootElement
                .children("svg.mainDrawArea");
        }

        public get nodes() {
            return this.mainElement
                .children("g.container")
                .children("path");
        }

        public get visibleNodes() {
            return this.nodes.filter((i,e) => $(e).css('display') !== "none");
        }
	}
}