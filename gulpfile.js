var gulp = require('gulp');
var gulpClean = require('gulp-clean');
var runSequence = require('run-sequence');
var selenium = require('selenium-standalone');
var selenium = require('selenium-standalone');
var streamConsume = require('stream-consume');
var mergeStream = require('merge-stream');

function build(name) {
    return new Promise((done, fail) => {
        var gulpTypescript = require('gulp-typescript');
        var srcDir = "src/" + name + "/";
        var buildDir = "build/" + name + "/";

        var cleanStream = gulp.src(buildDir).pipe(gulpClean());
        cleanStream.on("end", () => {
            var project = gulpTypescript.createProject(srcDir + "tsconfig.json", { noEmitOnError: false });
            var buildStream = project.src()
                .pipe(gulpTypescript(project))
                .on("error", (e) => fail())
                .pipe(gulp.dest(buildDir))
                .on("end", () => done());

            var copyStream = gulp.src(srcDir + "**/*.json")
                .pipe(gulp.dest(buildDir))
                .on("error", (e) => fail(e));

            streamConsume(mergeStream(copyStream, buildStream));
        })
        .on("error", (e) => fail(e));

        streamConsume(cleanStream);
    });
}

function installSeleniumServer() {
    return new Promise((done, fail) => {
        selenium.install(
            {
                logger: console.log
            },
            (error) => {
                if (error)
                    return fail(error);
                else
                    return done();
            });
    });
}

function runSeleniumServer() {
    return new Promise((done, fail) => {
        process.on("exit", () => selenium.child && selenium.child.kill());
        selenium.start((error, child) => {
            if (error) return fail(error);
            selenium.child = child;
            done();
        });
    });
}

function runTests(fileFilter) {
    return new Promise((done) => {
        var jasmine = require('jasmine-node');

        jasmine.getEnv().defaultTimeoutInterval = 15 * 60 * 1000;
        jasmine.executeSpecsInFolder({
            specFolders: [__dirname + "\\build\\CustomVisualsTests\\visuals\\"],
            onComplete: (runner, log) => {
                process.exit(runner.results().failedCount ? 1 : 0);
                done();
            },
            isVerbose: true,
            showColors: true,
            regExpSpec: new RegExp(fileFilter, "i")
        });
    });
}

function getArgsValue(name) {
    var keyValue = process.argv.filter(x => x.split("=")[0].trim().toLowerCase() === name)[0];
    return keyValue && (keyValue.indexOf("=") > 0 ? keyValue.split("=")[1] : "");
}

gulp.task("build", () => {
    return build("Common").then(() => build("CustomVisualsTests"));
});

gulp.task("install-start-selenium", () => {
    return installSeleniumServer().then(() => runSeleniumServer());
});

gulp.task("run", () => {
    return runTests(getArgsValue("--file"));
});

gulp.task('build-run', () => {
    return runSequence("build", "run");
});

gulp.task('build-install-run', () => {
    return runSequence("build", "install-start-selenium", "run");
});