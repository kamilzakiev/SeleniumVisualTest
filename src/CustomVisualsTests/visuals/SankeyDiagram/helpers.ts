namespace clientVisuals {
	export class SankeyDiagram {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.sankeyDiagram").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement(): JQuery {
            return this.rootElement.children("svg.sankeyDiagram");
        }

        public get nodesElement(): JQuery  {
            return this.mainElement.children("g").children("g.nodes");
        }

        public get nodeElements(): JQuery  {
            return this.nodesElement.children("g.node");
        }

        public get linksElement(): JQuery  {
            return this.mainElement.children("g").children("g.links");
        }

        public get linkElements(): JQuery  {
            return this.linksElement.children("path.link");
        }
	}
}