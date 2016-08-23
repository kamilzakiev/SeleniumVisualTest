var gulp = require('gulp');
var gulpClean = require('gulp-clean');
var runSequence = require('run-sequence');

function build(projectName) {
    var gulpTypescript = require('gulp-typescript');
    var buildDir = "build/";

    return gulp.src(buildDir).pipe(gulpClean())
        .on("end", () => buildProject(projectName));

    function buildProject(name) {
        var project = gulpTypescript.createProject("src/" + name + "/tsconfig.json");
        return project.src()
            .pipe(gulpTypescript(project))
            .pipe(gulp.dest(buildDir + name + "/"));
    }
}

function installAndRunSelenium() {
    return new Promise((done, fail) => {
        var selenium = require('selenium-standalone');
        process.on("exit", () => selenium.child && selenium.child.kill());

        selenium.install(
            {
                logger: console.log
            },
            (error) => {
                if (error) return fail(error);
                selenium.start((error, child) => {
                    if (error) return fail(error);
                    selenium.child = child;
                    done();
                });
            });
    });
}

function runTests() {
    return new Promise((done) => {
        var jasmine = require('jasmine-node');

        jasmine.getEnv().defaultTimeoutInterval = 30000;
        jasmine.executeSpecsInFolder({
            specFolders: [__dirname + "\\build\\CustomVisualsTests\\visuals"],
            onComplete: (runner, log) => {
                process.exit(runner.results().failedCount ? 1 : 0);
                done();
            },
            isVerbose: true,
            showColors: true
        });
    });
}

gulp.task("build:common", () => {
    return build("Common");
});

gulp.task("build:test", () => {
    return build("CustomVisualsTests");
});

gulp.task("build", () => {
    return runSequence("build:common", "build:test");
});

gulp.task("run", () => {
    return installAndRunSelenium().then(runTests);
});

gulp.task('build-run', () => {
    return runSequence("build", "run");
});