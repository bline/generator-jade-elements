(function () {
  'use strict';
  var yeoman = require('yeoman-generator');
  var path = require('path');
  var fs = require('fs');
  var _s = require('underscore.string');

  module.exports = yeoman.generators.Base.extend({
    initializing: function () {
      this.log('You called the JadeElements subgenerator with the argument ' + this.name + '.');

      this.argument('name', {
        required: true,
        type: String,
        desc: 'The element name. Must contain a dash.'
      });
      this.option('bower-imports', {
        required: false,
        type: [String, Array],
        desc: 'Bower html imports for this element'
      });
      this.option('local-imports', {
        required: false,
        type: [String, Array],
        desc: 'Local html imports for this element'
      });
      this.option('inline-coffee', {
        required: false,
        type: Boolean,
        desc: 'Store associated coffee in the Jade source'
      });
      this.option('inline-stylus', {
        required: false,
        type: Boolean,
        desc: 'Store associated stylus in the Jade source'
      });
      this.option('group', {
        required: false,
        type: String,
        desc: 'Specify group this element should be in. group is created if it does not exist.'
      });
      this.name = _s.slugify(this.name).toLowerCase();
      if (this.name.indexOf('-') === -1)
        this.name = this.name + '-element';
      this.bowerImports = this.options['bower-imports'] || [];
      this.localImports = this.options['local-imports'] || [];
      this.inlineCoffee = typeof this.options['inline-coffee'] === 'boolean' ? this.options['inline-coffee'] : this.config.get('inlineCoffee');
      this.inlineStylus = typeof this.options['inline-stylus'] === 'boolean' ? this.options['inline-stylus'] : this.config.get('inlineStylus');
    },

    _setRelRoot: function (destPath) {
      this.elementRoot = path.relative(destPath, this.destinationPath('src'))
      this.root = path.relative(destPath, this.destinationPath());
    },
    _writeTestIndex: function (destDir, add) {
      var destPath = this.destinationPath(destDir);
      this.suites = this.expand('*.{coffee,jade}', {cwd: destPath})
        .map(function (file) {
          var ext, newExt;
          if (fs.statSync(path.join(destPath, file)).isDirectory()) {
            if (fs.existsSync(path.join(destPath, file, 'index.jade')))
              return path.join(file, 'index.html');
            else if (fs.existsSync(path.join(destPath, file, 'index.coffee')))
              return path.join(file, 'index.js');
            else
              return 'skip';
          }
          ext = path.extname(file);
          newExt = ext === '.coffee' ? '.js' : '.html';
          return path.basename(file, ext) + newExt; })
        .filter(function (file) { return file !== 'index.html' && file !== 'skip' && file !== add; });
      if (add)
        this.suites.push(add);
      this.fs.copyTpl(
        this.templatePath('test/index.jade'),
        this.destinationPath(path.join(destDir, 'index.jade')),
        this
      );
    },
    configuring: {
      /* XXX share this method somehow */
      user: function () {
        var userInfo = this.config.get('userInfo');
        var setFromInfo = function (userInfo) {
          this.email = userInfo.email;
          this.realname = userInfo.realname;
          this.githubUser = userInfo.githubUser;
          this.githubUrl = userInfo.gethubUrl;
        }.bind(this);
        if (!userInfo) {
          userInfo = {};
          userInfo.email = this.user.git.email();
          userInfo.realname = this.user.git.name();
          var done = this.async();
          this.user.github.username(process.env.GITHUB_TOKEN, function (err, username) {
            if (username) {
              userInfo.githubUser = username;
              /* XXX fetch this from githubUser.info */
              userInfo.githubUrl = 'https://github.com/' + username;
            }
            this.config.set('userInfo', userInfo);
            setFromInfo(userInfo);
            done();
          }.bind(this));
          return;
        }
        setFromInfo(userInfo);
      }
    },
    writing: {
      srcFiles: function () {
        var dest = 'src/',
          destPath = this.destinationPath(dest);
        if (this.options.group) {
          dest += this.options.group + '/';
          destPath = this.destinationPath(dest);
          this.groups = this.expandFiles('*.jade', {cwd: destPath })
            .map(function (file) { return path.basename(file, '.jade'); })
            .filter(function (file) { return file !== 'index' && file !== this.name; }.bind(this));
          this.groups.push(this.name);
          this._setRelRoot(destPath);
          this.fs.copyTpl(
            this.templatePath('group.jade'),
            this.destinationPath(path.join(dest, 'index.jade')),
            this
          )
        } else
          this._setRelRoot(destPath);
        this.fs.copyTpl(
          this.templatePath('element.jade'),
          path.join(destPath, this.name + '.jade'),
          this
        );
        if (!this.inlineCoffee)
          this.fs.copyTpl(
            this.templatePath('element.coffee'),
            path.join(destPath, this.name + '.coffee'),
            this
          );
        if (!this.inlineStylus)
          this.fs.copyTpl(
            this.templatePath('element.styl'),
            path.join(destPath, this.name + '.styl'),
            this
          );
      },
      testFiles: function () {
        var dest = 'src/test';
        var relDest = this.name;
        var destPath = this.destinationPath(dest);
        var group = this.options.group;
        if (group) {
          dest = path.join(dest, group);
          destPath = this.destinationPath(dest);
          if (!fs.existsSync(path.join(destPath, 'index.jade')))
            this._writeTestIndex('src/test', path.join(group, 'index.html'));
        }
        this._setRelRoot(destPath);
        this._writeTestIndex(dest, this.name + '.html');
        this.fs.copyTpl(
          this.templatePath('test/basic-test.jade'),
          this.destinationPath(path.join(dest, this.name + '.jade')),
          this
        );
      }
    }
  });
})();
