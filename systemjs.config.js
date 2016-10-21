/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

    /*
    Problems:
        1. ngc compiles full paths to angular libs, this was conflicting with systemjs maps (solved)
        2. when using commonjs modules, after ngc compilation factories require angular source files directly, which
            are written with es6 imports, which in turn fails in browser.
            Using just es6 doesn't work either (fail in browser with "Unable to load transpiler to transpile")
            Can't find a solution yet
     */

    let packages = [
        'core',
        'common',
        'compiler',
        'platform-browser',
        'platform-browser-dynamic',
        'http',
        'router',
        'forms',
    ];

    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: Object.assign({
            // our app is within the app folder
            app: 'app',
            // angular bundles
            // '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            // '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            // '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            // '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            // '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            // '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            // '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            // '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs':                      'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
        }, generateMaps(packages)),
        // packages tells the System loader how to load when no filename and/or no extension
        packages: Object.assign({
            app: {
                main: './main.aot.js',
                defaultExtension: 'js'
            },
            aot: {
                defaultExtension: 'js'
            },
            'node-modules': {
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }, generatePackages(packages))
    });

    // makes:
    // '@angular/core': {
    //     main: './bundles/core.umd.js',
    //         defaultExtension: 'js'
    // }
    function generatePackages(names) {
        var config = {};
        names.forEach(name => {
            config[`@angular/${name}`] = {
                main: `bundles/${name}.umd.js`,
                defaultExtension: 'js',
                format: "cjs"
            };
        });
        return config;
    }

    // makes:
    // '@angular/core':  'npm:@angular/core',
    function generateMaps(names) {
        var config = {};
        names.forEach(name => {
            config[`@angular/${name}`] = `npm:@angular/${name}`;
        });
        return config;
    }

})(this);
