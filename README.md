[![Build status](https://ci.appveyor.com/api/projects/status/github/v-kazaki/SeleniumVisualTest?svg=true)](https://ci.appveyor.com/project/kamilzakiev/seleniumvisualtest)
#Selenium tests
This repo contains source code of Selenium tests for custom visuals of Power BI.
##Description
Embedded reports of Power BI provide easy way to generate custom visuals in the way we want to test them. Every visual has it's own report (.pbix) file that was used to publish it to the Power BI Service. 

Tests generally check if custom visual is generated and some tests also verifies proper applying of selection in custom visuals.
##How to launch tests
In order to launch tests locally, first run once the following command from the root folder to install npm packages of the project:
```javascript
// install npm packages
npm install
```
After that you will be able to launch tests using gulp commands. Note that you should first build the project, then install and start Selenium server and run tests after that. You can choose the following gulp commands separately or combine them:
```javascript
// build the project
gulp build
// install and start selenium
gulp install-start-selenium
// run tests
gulp run
// build and run tests (selenium server should be installed and run)
gulp build-run
// build the project, install and start Selenium server, run tests
gulp build-install-run
```
##Creating new test
Steps that should be taken to create new test:

1. Create report for the custom visual and generate "Publish to web" link to it.
2. Create new folder under "src/CustomVisualsTests/visuals/".
3. Add config.json file that is used to specify browsers and link to generated report. "prod" link is used to set the link to the embedded report, "dxt" and "msit" links are used if you have access to these environments.
4. Add test file in Typescript format.
5. Add .pbix file so it can be used to change your report later.
