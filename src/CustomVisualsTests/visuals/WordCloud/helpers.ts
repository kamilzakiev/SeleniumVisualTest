namespace clientVisuals {
	export class WordCloud {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("svg.wordCloud").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement() {
            return this.rootElement.children("svg.wordCloud");
        }

        public get words() {
            return this.mainElement
                .children("g")
                .children("g.words")
                .children("g.word");
        }

        public get wordText() {
            return this.words.children("text");
        }

        public get wordRects() {
            return this.words.children("rect");
        }

        public getWordRectByText(text: string) {
            var elements = this.words.toArray().filter(e => $(e).children("text").text() === text);
            if(_.isEmpty(elements)) {
                return;
            }

            var element = $(elements[0]).children("rect");
            return element;
        }

        public get selectedWords() {
            return this.wordText.filter((i, e) => parseFloat($(e).css('fill-opacity')) === 1);
        }
	}
}