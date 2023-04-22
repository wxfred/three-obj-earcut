## Three Obj Earcut

Triangulates obj text, depends on [three.js](https://github.com/mrdoob/three.js) and [earcut](https://github.com/mapbox/earcut), supports convex and concave polygon without holes.

## Install

```bash
npm install --save three-obj-earcut
```

## Usage

```js
import triangulate = require('three-obj-earcut')
const result = triangulate(objText)
```

## License

[MIT](LICENSE)