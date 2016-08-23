export module helpers {
    export function isAppveyor(): boolean {
        return (<any>isAppveyor).isAppveyor === undefined
            ? ((<any>isAppveyor).isAppveyor = require('is-appveyor'))
            : (<any>isAppveyor).isAppveyor;
    }
}