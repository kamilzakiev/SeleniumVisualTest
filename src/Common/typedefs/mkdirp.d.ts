declare module 'mkdirp' {

	function mkdirp(dir: string, cb: (err: any, made: string) => void): void;
	function mkdirp(dir: string, flags: any, cb: (err: any, made: string) => void): void;

	namespace mkdirp {
		function sync(dir: string, flags?: any): string;
	}
	export = mkdirp;
}