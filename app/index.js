'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();
    this.name = _s.slugify(this.appname).toLowerCase();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('JadeElements') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'includeCore',
      message: 'Would you like to include core-elements?',
      default: true
    }, {
      type: 'confirm',
      name: 'includePaper',
      message: 'Would you like to include paper-elements?',
      default: true
    }, {
      type: 'confirm',
      name: 'inlineCoffee',
      message: 'Inline CoffeeScript in elements by default?',
      default: false,
      store: true
    }, {
      type: 'confirm',
      name: 'inlineStylus',
      message: 'Inline Stylus in elements by default?',
      default: false,
      store: true
    }];

    this.prompt(prompts, function (props) {
      this.includeCore = props.includeCode;
      this.includePaper = props.includePaper;

      done();
    }.bind(this));
  },

  configuring: {
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
    gitfiles: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );
    },

    projectfiles: function () {
      console.log("name: ", this.name);
      this.fs.copy(
        this.templatePath('wct.conf.json'),
        this.destinationPath('wct.conf.json')
      );
      this.fs.copyTpl(
        this.templatePath('gulpfile.coffee'),
        this.destinationPath('gulefule.coffee'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulefule.js'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        this
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('coffeelint.json'),
        this.destinationPath('.coffeelint.json')
      );
    }
  },

  install: function () {
    var bowerModules = ['Polymer/polymer#^0.5.2'];
    if (this.includeCore)
      bowerModules.push("Polymer/core-elements#^0.5.2");
    if (this.includePaper)
      bowerModules.push("Polymer/paper-elements#^0.5.2");
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      bower: false,
      npm: true
    });
    this.log(yosay("Installing Polymer " + chalk.gray(bowerModules.join(","))));
    this.bowerInstall(bowerModules);
  }
});
