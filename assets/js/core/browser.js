var Browser = {
    initialized: false,
    info: {},
    searchVersion: function () {
        var agents = ['msie', 'firefox', 'webkit', 'safari', 'chrome', 'opera', 'android', 'iphone', 'ipad', 'msie 6', 'msie 7', 'msie 8', 'msie 9', 'msie 10', 'msie 11', 'Windows Phone'];
        var browserinfo = ' js';
        for (var j = 0; j < agents.length; j++) {
            if ((new RegExp(agents[j], "i")).test(navigator.userAgent)) {
                browserinfo += ' ' + agents[j].replace(' ', '');
                Browser.info[agents[j].replace(' ', '')] = true;
            } else {
                Browser.info[agents[j].replace(' ', '')] = false;
            }
        }
        if (Browser.info.chrome) { // Fix for chrome reporting as safari
            Browser.info.safari = false;
            browserinfo = browserinfo.replace(' safari', '');
        }
        return browserinfo;
    },
    init: function () {
        if (!Browser.initialized) {
            Browser.initialized = true;
            var browserClass = Browser.searchVersion();
            document.documentElement.className += browserClass;
        }
    }
}

Browser.init();
var ieBrowser = navigator.userAgent.match(/MSIE/i);
var touchBrowser = navigator.userAgent.match(/Touch/i);
if (ieBrowser) {
    if (document.documentMode == undefined) {
        document.documentElement.className += " document-ie7";
    } else {
        document.documentElement.className += " document-ie" + document.documentMode;
    }
}
var isMobile = Browser.info.iphone || Browser.info.android || Browser.info.ipad || Browser.info.WindowsPhone;
var isMobileRecourse = Browser.info.iphone || Browser.info.android || Browser.info.WindowsPhone;
var isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
if(isMacLike)
    document.documentElement.className += " mac";