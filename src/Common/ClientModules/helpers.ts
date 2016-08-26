namespace clientModules {
    export module helpers {
        export function getMouseEvent(type: string, options: MouseEventInit) {
            if (typeof MouseEvent === 'function') {
                return new MouseEvent(type, options);
            }

            var event = document.createEvent('MouseEvents');
            event.initMouseEvent(
                    type,
                    (typeof options.bubbles == 'undefined') ? true : !!options.bubbles,
                    (typeof options.cancelable == 'undefined') ? false : !!options.cancelable,
                    options.view || window,
                    options.detail | 0,
                    options.screenX | 0,
                    options.screenY | 0,
                    options.clientX | 0,
                    options.clientY | 0,
                    !!options.ctrlKey,
                    !!options.altKey,
                    !!options.shiftKey,
                    !!options.metaKey,
                    options.button | 0,
                    options.relatedTarget || null
            );

            return event;
        }

        export function clickElement(element: HTMLElement | JQuery, ctrlKey?: boolean) {
            var event = getMouseEvent("click", { ctrlKey: ctrlKey });
            var htmlElement = getHtmlElementFromObject(element);
            if(htmlElement) {
                htmlElement.dispatchEvent(event);
            }
        }

        export function getVisualsRootElements() {
            return $("div.vcBody > div.visual");
        }

        export function getTextWithoutChild(element: HTMLElement | JQuery) {
            return  getHtmlElementFromObject(element).childNodes[0].textContent;
        }

        function getHtmlElementFromObject(element: HTMLElement | JQuery): HTMLElement {
            if(element instanceof jQuery || 'jquery' in Object(element)) {
                return (<JQuery>element).get(0);
            } else {
                return <HTMLElement>element;
            }
        }
    }
}