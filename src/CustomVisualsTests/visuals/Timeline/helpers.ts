namespace clientVisuals {
	export class Timeline {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.timeline").parent().parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement(): JQuery {
            return this.rootElement
                .children("div")
                .children("svg.timeline");
        }

        public get cellRects(): JQuery {
            return this.mainArea
                .children(".cellsArea")
                .children(".cellRect");
        }

        public get mainArea() {
            return this.mainElement
                .children("g.mainArea");
        }

        public get allLabels() {
            return this.mainArea
                .children("g")
                .children("text.label");
        }

        public get rangeHeaderText() {
            return this.mainElement
                .children("g.rangeTextArea")
                .children("text.selectionRangeContainer");
        }

        public get timelineSlicer() {
            return this.mainElement
                .children("g.timelineSlicer");
        }
	}
}