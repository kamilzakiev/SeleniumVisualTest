namespace clientVisuals {
	export class ForceGraph {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.forceGraph").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement() {
            return this.rootElement.children("svg.forceGraph");
        }

        public get links() {
            return this.mainElement.children("path.link");
        }

        public get linkLabels() {
            return this.mainElement.children("g.linklabelholder");
        }

        public get nodes() {
            return this.mainElement.children("g.node");
        }

        public get nodeTexts() {
            return this.nodes.children("text");
        }

        public get linkLabelsText() {
            return this.linkLabels.children("text.linklabel");
        }

        public get linkLabelsTextPath() {
            return this.linkLabelsText.children("textpath");
        }
	}
}