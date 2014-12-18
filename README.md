# generator-jade-elements [![Build Status](https://secure.travis-ci.org/bline/generator-jade-elements.png?branch=master)](https://travis-ci.org/bline/generator-jade-elements)

Generator to create Web Component elements with Jade, Stylus and Coffee

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-jade-elements from npm, run:

```bash
npm install -g generator-jade-elements
```

Finally, initiate the generator:

```bash
yo jade-elements
```

jade-element produces a structure like:

```
└── src
    ├── firetree-element.coffee
    ├── firetree-element.jade
    ├── firetree-element.styl
    ├── group
    │   ├── index.jade
    │   ├── n1-element.coffee
    │   ├── n1-element.jade
    │   ├── n1-element.styl
    │   ├── n2-element.coffee
    │   ├── n2-element.jade
    │   ├── n2-element.styl
    ├── test
    ├── x-tree-element.coffee
    ├── x-tree-element.jade
    ├── x-tree-element.styl
```

For each element, all files are optional except the jade file.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Gulp](http://gulpjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License
Copyright (c) 2014 Scott Beck. All rights reserved.
Distributed under the [MIT](./LICENSE) license.

