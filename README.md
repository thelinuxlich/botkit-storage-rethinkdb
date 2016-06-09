# botkit-storage-rethinkdb

A RethinkDB storage module for Botkit.

## Usage

Just require `botkit-storage-rethinkdb` and pass it a [rethinkdbdash config object](https://github.com/neumino/rethinkdbdash#importing-the-driver).
Then pass the returned storage when creating your Botkit controller. Botkit will do the rest.

Make sure everything you store has an `id` property, that's what you'll use to look it up later.

```
var Botkit = require('botkit'),
    rdbStorage = require('botkit-storage-rethinkdb')({db: '...'}),
    controller = Botkit.slackbot({
        storage: rdbStorage
    });
```

```
// then you can use the Botkit storage api, make sure you have an id property
var beans = {id: 'cool', beans: ['pinto', 'garbanzo']};
controller.storage.teams.save(beans);
beans = controller.storage.teams.get('cool');

```
