/*!
 * nuci
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var fs = require("fs"),
    path = require("path"),
    parse = require('url-parse'),
    nuci = require("./nuci"),
    util = require("./util");

module.exports = {

    /**
     * Command line entry point.
     *
     * @param args
     */
    run: function(args, callback) {
        if (!args || args.length === 0) { return util.err("&require-command"); }

        var engine = nuci.parseEngineUri('nuci://' + args[0]);

        nuci.connect(engine, (err, info) => {
            if (err) { console.log(err); }
            nuci.sendArgs(args);
            nuci.prompt();
        });
    },

    /**
     * Get software help.
     *
     * @param args
     */
    getHelp: function (args) {
        var help = path.join(__dirname, "../help/help.txt");
        if (!args[0]) { console.log(fs.readFileSync(help)+""); }
        help = path.join(__dirname, "../help/" + args[0] + ".txt");
        if (fs.existsSync(help)) { return console.log(fs.readFileSync(help)+""); }
        return util.err("&cmd-undefined", { cmd: args[0] });
    },

    /**
     * Get software version.
     *
     * @param args
     */
    getVersion: function () {
        var info = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json")), "utf8");
        util.info("ndev-framework " + info.version, "developed by Francesco Bianco <bianco@javanile.org>");
        return info.name + "@" + info.version;
    }
};
