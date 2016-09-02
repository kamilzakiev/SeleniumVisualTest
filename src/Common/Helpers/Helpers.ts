import * as path from "path";

export module helpers {
    const rootPath = path.join(__dirname, "/../../../");

    export function isAppveyor(): boolean {
        return (<any>isAppveyor).isAppveyor === undefined
            ? ((<any>isAppveyor).isAppveyor = require('is-appveyor'))
            : (<any>isAppveyor).isAppveyor;
    }

    export function getAbsoluteOrRelativeToRootPath(pathVal) {
        if(path.isAbsolute(pathVal)) {
            return pathVal;
        }

        return path.join(rootPath, pathVal);
    }

    export function replaceToCommonSlash(value) {
        return value && value.replace("/\\/gi","/");
    }
}