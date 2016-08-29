namespace clientVisuals {
	export class Gantt {
        private rootElementValue: JQuery;

		constructor(element?: JQuery) {
            this.rootElementValue = (element || clientHelpers.getVisualsRootElements()).find("div.gantt-body").parent();
		}

		public get rootElement() {
			return this.rootElementValue;
		}

        public get mainElement() {
            return this.rootElement
                .children("div.gantt-body")
                .children("svg.gantt");
        }

        public get axis() {
            return this.mainElement.children("g.axis");
        }

        public get axisTicks() {
            return this.axis.children("g.tick");
        }

        public get chart() {
            return this.mainElement.children("g.chart");
        }

        public get taskLabels() {
            return this.mainElement
                .children("g.task-lines")
                .children("text.label");
        }

        public get tasksGroups() {
            return this.chart
                .children("g.tasks")
                .children("g.task-group");
        }

        public get tasks() {
            return this.tasksGroups.children("g.task");
        }

        public get taskResources() {
            return this.tasks.children("text.task-resource");
        }

        public get taskProgress() {
            return this.tasks
                .children("rect.task-progress");
        }

        public get legendGroup() {
            return this.rootElement
                .children("svg.legend")
                .children("g#legendGroup");
        }
	}
}