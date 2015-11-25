module.exports = function Angular2Foldering() {
  'use strict';

  var
    res = [],
    components = Array.prototype.slice.call(arguments),
    base = components.shift(),
    application = components.shift(),
    path = require('path')
    ;


  components.forEach((component, index, array) => {
    let
      unit = path.join('!' + base, component, '**', '*.spec.ts'),
      e2e = path.join('!' + base, component, '**', '*.e2e.ts'),
      include = path.join.bind(path, base, component),

      data = {
        src: [
          include('component.js'),
          unit,
          e2e,
          include('**', '*Ctrl.ts')
        ],
        css: include('component.scss'),
        dest: component,
        order: index + 1
      }
    ;

    res.push(data)
  });

  res.push({
    src: [path.join(base, application + '.js')],
    dest: application,
    css: path.join(base, application + '.scss'),
    order: res.length + 1
  });
  return res;
};
