export function getJsWebdriverIOHelpers() {
    var fn = <{result: typeof result}><any>getJsWebdriverIOHelpers;
    if(fn.result) {
        return fn.result;
    }

    var result = {
        getMouseEvent: function(type: string, options: MouseEventInit) {
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
    };

    return fn.result = result
}