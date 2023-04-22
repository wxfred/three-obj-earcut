const THREE = require('three')
const earcut = require('earcut')

function triangulate(text) {
  const finalLines = []
  const lines = text.split('\n')
  const vertices = []
  const normals = []

  const quaternion = new THREE.Quaternion()
  const vFrom = new THREE.Vector3()
  const vTo = new THREE.Vector3(0, 0, 1) // normal of XY plane
  const vector = new THREE.Vector3()

  for (let line of lines) {
    const tokens = line.split(' ')
    if (tokens[0] === 'v') {
      vertices.push([
        parseFloat(tokens[1]),
        parseFloat(tokens[2]),
        parseFloat(tokens[3])
      ])
    } else if (tokens[0] === 'vn') {
      normals.push([
        parseFloat(tokens[1]),
        parseFloat(tokens[2]),
        parseFloat(tokens[3])
      ])
    } else if (tokens[0] === 'f' && tokens.length > 4) {
      const coords = []
      let normal
      for (let i = 1; i < tokens.length; ++i) {
        const indexTokens = tokens[i].split('/')
        const vertex = vertices[parseInt(indexTokens[0]) - 1]
        coords.push(...vertex)
        normal = normal ? normal : normals[parseInt(indexTokens[2]) - 1]
      }
      
      // rotate vertices in the same face to parallel the XY plane, because
      // Note that Earcut is a 2D triangulation algorithm, and handles 3D data as if it was projected onto the XY plane (with Z component ignored)
      for (let i = 0; i < coords.length; i += 3) {
        vFrom.set(normal[0], normal[1], normal[2])
        quaternion.setFromUnitVectors(vFrom, vTo)
        vector.set(coords[i], coords[i + 1], coords[i + 2])
        vector.applyQuaternion(quaternion)
        coords[i] = vector.x
        coords[i + 1] = vector.y
        coords[i + 2] = vector.z
      }

      const triangles = earcut(coords, null, 3)
      console.log(coords, triangles)
      for (let i = 0; i < triangles.length; i += 3) {
        finalLines.push(`f ${tokens[triangles[i] + 1]} ${tokens[triangles[i + 1] + 1]} ${tokens[triangles[i + 2] + 1]}`)
      }

      continue
    }

    finalLines.push(line)
  }

  return finalLines.join('\n')
}

module.exports = triangulate
module.exports.default = triangulate