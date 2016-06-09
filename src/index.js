var rethinkdbdash = require('rethinkdbdash');

/**
 * botkit-storage-rethinkdb - RethinkDB driver for Botkit
 *
 * @param  {Object} config
 * @return {Object} A storage object conforming to the Botkit storage interface
 */
module.exports = function(config) {
    var _config = config || {};

    if (typeof _config !== "object") {
        throw new Error('Need to provide rethinkdbdash config object.');
    }

    var db = rethinkdbdash(_config),
        storage = {};

    ['teams', 'channels', 'users'].forEach(function(zone) {
        storage[zone] = getStorage(db, "botkit_" + zone);
    });

    return storage;
};

/**
 * Creates a storage object for a given "zone", i.e, teams, channels, or users
 *
 * @param {Object} db A reference to the rethinkdbdash instance
 * @param {String} zone The table to query in the database
 * @returns {{get: get, save: save, all: all}}
 */
function getStorage(db, zone) {
    var table = db.table(zone);

    return {
        get: function(id, cb) {
            table.get(id).run().then(cb);
        },
        save: function(data, cb) {
            table.insert(data, {
                conflict: "replace"
            }).run({
                durability: "soft"
            }).then(cb);
        },
        all: function(cb) {
            table.run().then(cb);
        }
    };
}
