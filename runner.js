var myTest = require("./tests/myTest");
var browsers = ['internet explorer', 'chrome', /*'firefox', 'MicrosoftEdge', 'opera'*/];

browsers.forEach(function(browser) {    
    myTest(browser);
});


