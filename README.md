## Three Obj Earcut

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/three-obj-earcut.svg?style=flat-square
[npm-url]: https://npmjs.org/package/three-obj-earcut
[download-image]: https://img.shields.io/npm/dm/three-obj-earcut.svg?style=flat-square
[download-url]: https://npmjs.org/package/three-obj-earcut

Triangulates obj text, depends on [three.js](https://github.com/mrdoob/three.js) and [earcut](https://github.com/mapbox/earcut), supports convex and concave polygon without holes.

Make sure your obj file contains normal coords, the first vertex's normal in a face will be used for rotation (rotate the face to parallel to the XY plane), because earcut handles 3D data as if it was projected onto the XY plane.

## Install

```bash
npm install --save three-obj-earcut
```

## Usage

```js
import triangulate from 'three-obj-earcut'
const result = triangulate(objText)
```

## License

[MIT](LICENSE)