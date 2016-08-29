namespace clientVisuals {
	export class ChordChart {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.chordChart").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement() {
            return this.rootElement
                .children("svg.chordChart")
                .children("g");
        }

        public get dataLabels() {
            return this.mainElement
                .children("g.labels")
                .children("text.data-labels");
        }

        public get sliceTicks() {
            return this.mainElement
                .children("g.ticks")
                .children("g.slice-ticks");
        }

        public get chords() {
            return this.mainElement
                .children("g.chords")
                .children("path.chord");
        }

        public get slices() {
            return this.mainElement
                .children("g.slices")
                .children("path.slice");
        }
	}
}