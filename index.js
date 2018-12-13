'use strict';

exports.onHandleCode = function onHandleCode(ev) {
    var varCount = -1,
        code = ev.data.code,
        title = ev.data.filePath,
        matched = false,
        lastPosition,
        endMatch = '}));';

    matched = /\;\(function[ \t]*\(root, factory\)/.test(code);

    // we found a UMD style module - do the thing
    if (matched) {

        // grab the filename from path
        title = title.split("/").pop();

        // remove the '.js'
        title = title.split(".")[0];

        // borrowed from https://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
        // transforms kebab to camelcase
        title = title.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

        // set the start of the file to be a named function so we get some hinting
        // transform the start of the UMD style module
        code = code.replace(
            /\;\(function[ \t]*\(root, factory\)[ \t]*\{([\s\S])*\}\(this,[ \t]*function([\s\S])*?\)[ \t]{/,
            'function ' + title + '() {'
        );

        // replace the end of the UMD function
        lastPosition = code.lastIndexOf(endMatch);

        // cut based on end of file, replace
        code = code.slice(0, lastPosition) +
            code.slice(lastPosition)
            .replace(endMatch, '};\nexport default ' + title + ';');

        ev.data.code = code;
    }

};
