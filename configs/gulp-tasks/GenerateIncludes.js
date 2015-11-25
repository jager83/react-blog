function generateIncludes(gulp, options, APP_DIR, ENV) {
  'use strict';

  let
    fs = require('fs'),
    path = require('path'),
    dist = path.join.bind(path, options.dest, 'includes')
  ;

  fs.existsSync(dist('..')) || fs.mkdirSync(dist('..'));
  fs.existsSync(dist()) || fs.mkdirSync(dist());

  let write = (filename, content) => {
    return fs.writeFileSync(dist(filename), content);
  };

  let script = (base, filename) => {
    return '' +
      '<script ' +
      'type="text/javascript" ' +
      'src="' + base + '/' + filename + '.js?' + options.unique + '">' +
      '</script>'
    ;
  };

  let css = (base, filename) => {
    return '' +
      '<link ' +
      'rel="stylesheet" ' +
      'href="' + base + '/' + filename + '.css?' + options.unique + '"/>'
    ;
  };

  return function() {
    let components = ((components) => {
      let res = {js: [], css: []};

      for(let dest = '', i = 0; i < components.length; i++) {
        dest = components[i].dest;

        res.css.push(css(options.componentsHttpPath, dest));
        res.js.push(script(options.componentsHttpPath, dest));
      }

      return res;
    })(options.components);


    write(
      'head.development.html',
      components.css.reverse().join('\n') + '\n\n' + components.js.join('\n')
    );

  }

}

module.exports = generateIncludes;
