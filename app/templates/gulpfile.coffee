path = require("path")
_ = require("lodash")
fs = require("fs")
gulp = require("gulp")
$ = require("gulp-load-plugins")()
del = require("del")

# see https://github.com/Polymer/web-component-tester#gulp
require("web-component-tester").gulp.init gulp

# XXX HACK submit PR or write gulp plugin replacement
for task in [ "test", "test:local", "test:remote"]
  gulp.tasks[task].dep.push "build"

getJade = ->
  jade = require("jade")
  # This is how you add custom filters to jade. Could not find documentation
  # on this feature.
  jade.filters.escape = (block) ->
    _.escape block
  return jade

build = do ->
  dirGlob = "{,*/}*"
  jade = getJade()
  pkgName = "<%= name %>"
  destPath = "dist"
  srcPath = "src"

  flags:
    watching: false
  paths:
    src: srcPath
    dest: destPath
    clean: [
      "*.html"
      "*.css"
      "test/*.html"
      "test"
      "dist/*.html"
      "dist"
    ]
    coffeeSrc: path.join(srcPath, "#{dirGlob}.coffee")
    jadeSrc: path.join(srcPath, "#{dirGlob}.jade")
    jadeDest: destPath
    stylusSrc: path.join(srcPath, "#{dirGlob}.styl")
    stylusDest: destPath

  options:
    jade:
      jade: jade
      pretty: true

    coffee: {}

    stylus:
      sourcemap:
        inline: true
        sourceRoot: build.paths.src
        basePath: build.paths.dest

    # see https://github.com/phated/gulp-jade#use-with-gulp-data
    data: (file, cb) ->
      jsonPath = file.path.replace(/\.jade$/, ".json")
      fs.exists jsonPath, (exists) ->
        if exists
          fs.readFile jsonPath,
            encoding: "utf8"
          , (err, data) ->
            json = undefined
            return cb(err)  if err
            try
              json = JSON.parse(data)
            catch e
              return cb(e)
            cb null, json
            return

        else
          cb null, {}
        return

      return

attachError = (type, stream) ->
  stream.on 'error', (error) ->
    console.error type + " error: " + error
  return stream

gulp.task "clean", (done) ->
  del paths.clean, done
  return

gulp.task 'build:coffee', ->
  gulp.src(build.paths.coffeeSrc)
    .pipe($.buffer())
    .pipe($.coffee())
    .pipe(gulp.dest(build.paths.coffeeDest))

# see https://github.com/stevelacy/gulp-stylus
# see http://learnboost.github.io/stylus/
gulp.task 'build:stylus', ->
  gulp.src(build.paths.stylusSrc)
    .pipe($.buffer())
    .pipe($.stylus(build.options.stylus))
    .pipe(gulp.dest(build.paths.stylusDest))

# see https://github.com/phated/gulp-jade
# see http://jade-lang.com/
gulp.task 'build:jade', ->
  gulp.src(build.paths.jadeSrc)
    .pipe($.data(build.options.data))
    .pipe($.buffer())
    .pipe($.jade(build.options.jade))
    .pipe($.usemin(
      css: [$.minifyCss()]
      html: [$.minifyHtml empty: true]
      js: [$.uglify(), $.rev()])
    .pipe(gulp.dest(paths.elementDest))

# see https://github.com/sindresorhus/gulp-vulcanize
# see https://github.com/polymer/vulcanize
#gulp.task "vulcanize", ["jade"], ->
#  gulp.src(build.paths.vulcanSrc).pipe(gulpVulcanize(build.options.vulcanize)).pipe gulp.dest(build.paths.vulcanDest)

gulp.task "watch", ->
  build.flags.watching = true
  gulp.watch [
    build.paths.jadeSrc
    build.paths.coffeeSrc
    build.paths.stylusSrc
  ], ["build"]
  return

return
