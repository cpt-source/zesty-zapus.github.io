// More information on creating custom loading screens can be found here
// http://developer.playcanvas.com/en/user-manual/designer/loading-screen/

pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';
        
        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #283538;',
            '}',

            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #283538;',
            '}',

            '#application-splash {',
            '    position: absolute;',
            '    top: calc(50% - 132px);',
            '    width: 264px;',
            '    left: calc(50% - 132px);',
            '}',

            '#application-splash img {',
            '    width: 100%;',
            '}',

            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 2px;',
            '    width: 100%;',
            '    background-color: #1d292c;',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #f60;',
            '}',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}'
        ].join("\n");

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };


    createCss();

    showSplash();
    
    // Use an image from the assets in the project via the asset registry
    // More information: http://developer.playcanvas.com/en/api/pc.AssetRegistry.html
    app.on('preload:start', function() {
        var splash = document.getElementById('application-splash');
        var splashWrapper = document.getElementById('application-splash-wrapper');
        var logoAsset = app.assets.find('logo.png');
        var logo2Asset = app.assets.find('logo.png');
        
        if (logoAsset && logo2Asset) {
            var logo = document.createElement('img');
            var logo2 = document.createElement('img');
            logo2.src = logo2Asset.getFileUrl();
            logo.src = logoAsset.getFileUrl();

            
            // logo2.setAttribute("src", "img_pulpit.jpg");
            logo2.setAttribute("width", "50");
            // logo2.setAttribute("height", "228");
            // logo2.setAttribute("alt", "The Pulpit Rock");
            logo2.setAttribute("style", "position:absolute !important;top:0 !important;right:0 !important");
            
            
            // Insert DOM before the progress bar
            if (splash.childNodes.length > 0) {
                splash.insertBefore(logo, splash.childNodes[0]);
                splashWrapper.appendChild(logo2);
            } else {
                splash.appendChild(logo);
                splashWrapper.appendChild(logo2);
            }
            
            

            
            logo.onload = function () {
                splash.style.display = 'block';
            };
        }
    });
        
    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});
