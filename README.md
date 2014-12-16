# generator-jade-elements [![Build Status](https://secure.travis-ci.org/bline/generator-jade-elements.png?branch=master)](https://travis-ci.org/bline/generator-jade-elements)

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

jade-element supports two structures:

```
└── src
    ├── firetree-element.coffee
    ├── firetree-element.jade
    ├── firetree-element.styl
    ├── firetree-element.yaml
    ├── group
    │   ├── index.jade
    │   ├── n1-element.coffee
    │   ├── n1-element.jade
    │   ├── n1-element.styl
    │   ├── n1-element.yaml
    │   ├── n2-element.coffee
    │   ├── n2-element.jade
    │   ├── n2-element.styl
    │   └── n2-element.yaml
    ├── test
    ├── x-tree-element.coffee
    ├── x-tree-element.jade
    ├── x-tree-element.styl
    └── x-tree-element.yaml
```

and

```
└── src
    ├── firetree-element
    │   ├── index.coffee
    │   ├── index.jade
    │   ├── index.styl
    │   └── index.yaml
    ├── foo-element
    │   ├── index.coffee
    │   ├── index.jade
    │   ├── index.styl
    │   └── index.yaml
    ├── group
    │   ├── index.jade
    │   ├── n1-element
    │   │   ├── index.coffee
    │   │   ├── index.jade
    │   │   ├── index.styl
    │   │   └── index.yaml
    │   └── n2-element
    │       ├── index.coffee
    │       ├── index.jade
    │       ├── index.styl
    │       └── index.yaml
    └── test

```

For each element, all files are optional except the jade file.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
