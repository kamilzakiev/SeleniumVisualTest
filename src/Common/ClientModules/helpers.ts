namespace clientHelpers {
    export function getMouseEvent(type: string, options: MouseEventInit) {
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

    export function clickElement(anyElement: HTMLElement | JQuery, ctrlKey?: boolean) {
        return dispatchMouseEvent("click", anyElement, ctrlKey);
    }

    export function dispatchMouseEvent(type: string, anyElement: HTMLElement | JQuery, ctrlKey?: boolean) {
        var element = $(anyElement);
        var event = getMouseEvent(type, {
                ctrlKey: ctrlKey,
                clientX: element.offset().left + element.outerWidth() / 2,
                clientY: element.offset().top + element.outerHeight() / 2
            });
        return element.toArray().map((e: HTMLElement) => e.dispatchEvent(event));
    }

    export function getVisualsRootElements() {
        return $("div.vcBody > div.visual, html > body.visual-sandbox");
    }

    export function getTextWithoutChild(anyElement: HTMLElement | JQuery) {
        return $(anyElement)[0].childNodes[0].textContent;
    }
    
    export function waitUntil(condition: () => boolean, timeoutMs?: number, interval: number = 100) {
        var deffered = $.Deferred();
        var startTime = Date.now();

        function conditionTest() {
            if(condition()) {
                deffered.resolve();
            } else {
                if(timeoutMs > 0 && Date.now() - startTime > timeoutMs) {
                    deffered.rejectWith("timeout");
                } else {
                    setTimeout(conditionTest, interval);
                }
            }
        }

        conditionTest();
        return deffered;
    }
}