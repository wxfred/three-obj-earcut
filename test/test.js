const fs = require('fs')
const path = require('path')
const test = require('tape')
const triangulate = require('../src/index')

test('cube', function (t) {
  const text = fs.readFileSync(path.join(__dirname, 'objs', 'cube.obj'), 'utf-8')
  const expected = fs.readFileSync(path.join(__dirname, 'objs', 'cube.tri.obj'), 'utf-8')
  const actual = triangulate(text)
  t.same(actual, expected)
  t.end()
})