# megadraft-embed - Megadraft Plugin [![Build Status](https://travis-ci.org/arturfelipe/megadraft-embed.svg?branch=master)](https://travis-ci.org/arturfelipe/megadraft-embed) [![codecov](https://codecov.io/gh/arturfelipe/megadraft-embed/branch/master/graph/badge.svg)](https://codecov.io/gh/arturfelipe/megadraft-embed)

Megradraft plugin to embed media URLs.

## Supported Medias

We support the following medias:

* __Twitter__: Users should provide a valid `twitter` post URL like:
`https://twitter.com/RedeGlobo/status/840532910696361984`.

If you need some other media, check the section: `Add new sources` above.

## Usage

Include the plugin in the `plugins` prop of your `Megadraft` instance.

```js
import React from "react";
import ReactDOM from "react-dom";
import Megadraft from "megadraft";

import plugin from "megadraft-embed";

class Example extends React.Component {
  render(){
    return (
      <Megadraft plugins={[plugin]} />
    );
  }
}

ReactDOM.render(<Example />, document.getElementById("container"));
```

## Contributing

Install, run, test.

```
# Install npm dependencies
make setup

# Gulp dev-server task with webpack + sass running on http://localhost:8080/
make run

# Run mocha tests + eslint
make test
```

If you're constantly running tests, there's a faster alternative using mocha's
watch feature:

```
make watch_unit
```

## Add new sources

--

## Releasing

There's a `prepublish` script entry on `package.json` that runs build tasks
before publishing the package.

```
npm publish
```

## Third Party

The sample plugin uses the extension icon from https://design.google.com/icons/
under [Apache License Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

Social Medias:

* Facebook, Maps, Youtube, Twitter: Icons made by [SimpleIcon](http://www.flaticon.com/authors/simpleicon) is licensed by [CC BY 3.0](http://creativecommons.org/licenses/by/3.0)

* Instagram: Icons made by [GraphicsBay](http://www.flaticon.com/authors/graphicsbay) is licensed by [CC BY 3.0](http://creativecommons.org/licenses/by/3.0)

* Pinterest: Icons made by [Freepik](http://www.freepik.com) is licensed by [CC BY 3.0](http://creativecommons.org/licenses/by/3.0)
