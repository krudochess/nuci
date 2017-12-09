/*!
 * ndev-framework
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var base = require("path").basename,
    join = require("path").join,
    readline = require('readline'),
    client = require('centralio').client;
    parse = require('url-parse'),
    util = require("./util");

module.exports = {

    /**
     *
     */
    client: null,

    /**
     *
     */
    engine: null,

    /**
     *
     */
    input: null,

    /**
     * Run ndev module package.json scripts.
     *
     * @param args
     */
    connect: function (engine, callback) {

        this.engine = engine;
        this.client = client();

        this.client.start(engine.host, engine.port);

        this.client.tx('nuci', (err) => {
            if (err) { }
            this.client.tx(engine.name, (err) => {
                if (err) { }
                return callback({info: 'ad'});
            })
        });

        this.client.rx('connect', (data) => {
            console.log("receive from server:", data+"");
        });
    },

    parseEngineUri: function (uri) {
        var parts = parse(uri);

        return {
            host: parts['host'] || 'localhost',
            port: parts['port'] || 55005,
            name: parts['username'] || 'default',
        };
    },

    sendArgs: function (args) {
        console.log("send arguments:", args);
    },

    prompt: function () {
        this.input = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
        this.input.setPrompt('> ');
        this.input.prompt();
        this.input.on('line', (line) => {
            console.log('?', line);
            this.client.tx(line, () => {});
            this.input.prompt();
        }).on('close', function() {
            console.log('Have a great day!');
            process.exit(0);
        });

        /*
        this.question = () => {
            this.input.question('>', (line) => {
                console.log(line);
                this.question();
            });
        };

*/

        //this.input.prompt();
    }


};
