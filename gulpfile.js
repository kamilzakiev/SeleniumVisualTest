var gulp = require('gulp');
var gulpClean = require('gulp-clean');
var runSequence = require('run-sequence');
var selenium = require('selenium-standalone');
var selenium = require('selenium-standalone');
var streamConsume = require('stream-consume');
var mergeStream = require('merge-stream');
var jasmineReporters = require("jasmine-reporters");
var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config.json"));

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
        var jasmineNode = require('jasmine-node');
        var jasmineConsoleReporter = require('jasmine-console-reporter');

        var reporter = new jasmineConsoleReporter({
            colors: 2,           // (0|false)|(1|true)|2 
            cleanStack: true,       // (0|false)|(1|true)|2|3 
            verbosity: 4,        // (0|false)|1|2|(3|true)|4 
            listStyle: 'indent', // "flat"|"indent" 
            activity: !require('is-appveyor')
        });

        jasmine.getEnv().addReporter(reporter);

        jasmineNode.run({
            specFolders: [__dirname + "\\build\\CustomVisualsTests\\visuals\\"],
            forceExit: true,
            match: fileFilter,
            captureExceptions: true
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