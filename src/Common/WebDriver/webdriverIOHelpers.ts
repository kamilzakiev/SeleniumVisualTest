///<reference path="../typedefs/WebDriverIO.d.ts"/>
import * as WebdriverIO from "webdriverio";
export {WebdriverIO};
import {getJsWebdriverIOHelpers} from "./JSWebdriverIOHelpers";

export module webdriverIOHelpers {
    (function init() {
        let clients: WebdriverIO.Client<void>[] = [];
        let remote = WebdriverIO.remote;

        (<any>WebdriverIO).remote = function() {
            let client = remote.apply(this, arguments);
            clients.push(client);
            return client;
        };

        let runner = jasmine.getEnv().currentRunner();
        let finishCallback = runner.finishCallback;

        runner.finishCallback = function() {
            let finishCallbackArgs = arguments;
            Q.allSettled(clients.map(c =>  c.endAll())).finally(() => {
                if(finishCallback) {
                    finishCallback.apply(this, finishCallbackArgs);
                }
            });
        };
    })();

    export enum Browser {
        chrome = <any>"chrome",
        firefox = <any>"firefox",
        internetExplorer = <any>"internet explorer",
        //edge = <any>"edge"
    }

    export module SpecialKeys {
        export const CANCEL = "\uE001";
        export const HELP = "\uE002";
        export const BACK_SPACE = "\uE003";
        export const TAB	= "\uE004";
        export const CLEAR = "\uE005";
        export const RETURN = "\uE006";
        export const ENTER = "\uE007";
        export const SHIFT = "\uE008";
        export const CONTROL	= "\uE009";
        export const ALT	= "\uE00A";
        export const PAUSE = "\uE00B";
        export const ESCAPE = "\uE00C";
        export const SPACE = "\uE00D";
        export const PAGE_UP	= "\uE00E";
        export const PAGE_DOWN = "\uE00F";
        export const END	= "\uE010";
        export const HOME = "\uE011";
        export const ARROW_LEFT = "\uE012";
        export const ARROW_UP = "\uE013";
        export const ARROW_RIGHT = "\uE014";
        export const ARROW_DOWN = "\uE015";
        export const INSERT = "\uE016";
        export const DELETE = "\uE017";
        export const SEMICOLON = "\uE018";
        export const EQUALS = "\uE019";
        export const NUMPAD0 = "\uE01A";
        export const NUMPAD1 = "\uE01B";
        export const NUMPAD2 = "\uE01C";
        export const NUMPAD3 = "\uE01D";
        export const NUMPAD4 = "\uE01E";
        export const NUMPAD5 = "\uE01F";
        export const NUMPAD6 = "\uE020";
        export const NUMPAD7 = "\uE021";
        export const NUMPAD8 = "\uE022";
        export const NUMPAD9 = "\uE023";
        export const MULTIPLY = "\uE024";
        export const ADD = "\uE025";
        export const SEPARATOR = "\uE026";
        export const SUBTRACT = "\uE027";
        export const DECIMAL = "\uE028";
        export const DIVIDE = "\uE029";
        export const F1 = "\uE031";
        export const F2 = "\uE032";
        export const F3 = "\uE033";
        export const F4 = "\uE034";
        export const F5 = "\uE035";
        export const F6 = "\uE036";
        export const F7 = "\uE037";
        export const F8 = "\uE038";
        export const F9 = "\uE039";
        export const F10 = "\uE03A";
        export const F11 = "\uE03B";
        export const F12 = "\uE03C";
        export const META = "\uE03D";
        export const COMMAND = "\uE03D"
    }

    export function getWebClient(browser: Browser) {
        let client = WebdriverIO.remote({ desiredCapabilities: { browserName: browser }, waitforTimeout: 30000 });
        return client;
    }

    export function getTextWithoutChild(selector: string): () => any {
        return function() {
            let client = <WebdriverIO.Client<void>>this;
            return client.selectorExecute(selector, function(element: HTMLElement[]) {
                return element[0].childNodes[0].textContent;
            });
        };
    }

    export function click(selector: string, ctrlKey?: boolean): () => any {
        return function() {
            let client = <WebdriverIO.Client<void>>this;
            return client.selectorExecute(selector,
                function(element: HTMLElement[], getHelpers: typeof getJsWebdriverIOHelpers, ctrlKey: boolean) {
                    var event = getHelpers().getMouseEvent("click", { ctrlKey: ctrlKey });
                    return element[0].dispatchEvent(event);
                }, getJsWebdriverIOHelpers, ctrlKey);
        };
    }
}


