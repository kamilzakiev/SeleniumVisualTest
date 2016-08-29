namespace clientVisuals {
	export class ChicletSlicer {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("div.chicletSlicer").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement(): JQuery {
            return this.rootElement.children("div.chicletSlicer");
        }

        public get slicerBody(): JQuery {
            return this.mainElement.children("div.slicerBody");
        }

        public get searchHeader(): JQuery {
            return this.mainElement.children("div.searchHeader");
        }

        public get slicerHeader(): JQuery {
            return this.mainElement.children("div.slicerHeader");
        }

        public get slicerHeaderText(): JQuery {
            return this.slicerHeader.children("div.headerText");
        }

        public get visibleGroup(): JQuery {
            return this.mainElement
                .children("div.slicerBody")
                .children("div.scrollRegion")
                .children("div.visibleGroup");
        }

        public get visibleGroupRows() {
            return this.visibleGroup.children("div.row");
        }

        public get visibleGroupCells() {
            return this.visibleGroupRows.children("div.cell");
        }

        public get slicerTextElements(): JQuery {
            return this.visibleGroup.find(".slicerText");
        }

        public get slicerItemContainers(): JQuery {
            return this.visibleGroupCells.children("ul").children(".slicerItemContainer");
        }

        public get slicerItemImages(): JQuery {
            return this.slicerItemContainers.children("img.slicer-img-wrapper");
        }
	}
}