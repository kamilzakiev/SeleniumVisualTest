///<reference path="./WebDriverIO.d.ts"/>

declare module WebdriverCSS {
    export interface GmOptions {
        appPath: string;
    }

    export interface InitOptions {
        screenshotRoot?: string;
        failedComparisonsRoot?: string,
        misMatchTolerance?: number;
        screenWidth?: number[];
        saveImages?: boolean;
        updateBaseline?: boolean;
        user?: string;
        api?: string;
        key?: string;
        gmOptions?: GmOptions;
    }

    export interface Options {
        /**
         * name of the captured element
         */
        name: string;

        /**
         * only capture a specific DOM element, you can use all kinds of different WebdriverIO selector strategies here
         */
        elem?: string

        /**
         * define a fixed width for your screenshot
         */
        width?: number

        /**
         * define a fixed height for your screenshot
         */
        height?: number

        /**
         * take screenshot at an exact xy postion (requires width/height option)
         */
        x?: number

        /**
         * take screenshot at an exact xy postion (requires width/height option)
         */
        y?: number;

        /**
         * exclude frequently changing parts of your screenshot, you can either pass all kinds of different WebdriverIO selector strategies that queries one or multiple elements or you can define x and y values which stretch a rectangle or polygon
         */
        exclude?: string[] | any[];

        /**
         * hides all elements queried by all kinds of different WebdriverIO selector strategies (via visibility: hidden)
         */
        hide?: string[];

        /**
         * removes all elements queried by all kinds of different WebdriverIO selector strategies (via display: none)
         */
        remove?: string[]

        /**
         * can be used to ignore color differences or differences caused by antialising artifacts in the screenshot comparison
         */
        ignore?: string
    }

    export interface ComparisonResults {
        [name: string]: ({
            baselinePath: string;
            regressionPath: string;
            diffPath: string;
            message: string;
            misMatchPercentage: number;
            isExactSameImage: boolean;
            isSameDimensions: boolean;
            isWithinMisMatchTolerance: boolean;
            properties: Options;
        })[]
    }

    export function init(client: WebdriverIO.Client<void>): void;
    export function init(client: WebdriverIO.Client<void>, options: InitOptions): void;
}

declare namespace WebdriverIO {
    export interface Client<T> {
        webdrivercss(pagename: string, options: WebdriverCSS.Options): Client<WebdriverCSS.ComparisonResults>;

        sync();
        saveViewportScreenshot(fileName: string);
        saveDocumentScreenshot(fileName: string);
    }
}

declare module "webdrivercss" {
    export = WebdriverCSS;
}