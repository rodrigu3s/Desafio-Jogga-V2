const { src, dest, watch, series, parallel } = require('gulp')
const browserSync = require('browser-sync')
const clean = require('gulp-clean')
const pathExists = require('path-exists')
const htmlmin = require('gulp-htmlmin')
const fileinclude = require('gulp-file-include')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin');

// SWALLOW ERROR
function swallowError(error) {
    console.log(error.toString()) // Tranforma objeto Eroo em String e mostra no console 
    this.emit("end")   
}

// HTML
function html() {
    return src("src/index.html")
        .pipe(fileinclude({
            prefix: '@@',          //Quando fazer o Includ  
            basepath: '@file'      //Aonde fazer - Importar a partir do arquivo   
        }))
        .pipe(htmlmin({collapseWhitespace: true })) // minifica html
        .on('error', swallowError)
        .pipe(dest("dist/"))
}


// SCSS
function scss(){
    return src('src/assets/scss/style.scss')
        .pipe(sass({
            outputStyle: 'compressed' //minifica css
        }))
        .pipe(dest('dist/assets/css'))
    
}


// IMG
function img(){
    const pathImg = [
        "src/assets/img/*.svg",
        "src/assets/img/*.jpg",
        "src/assets/img/*.png"
    ]
    return src(pathImg)
        .pipe(imagemin())
        .pipe(dest('dist/assets/img'))
}


// CLEAN DIST
function cleanDist(){
    return src('dist')
        .pipe(clean())
}


// BROWSER SYNC
function reload(done) {
    browserSync.reload();
    done();
}

function server(done) {
    browserSync.init({
      server: {
        baseDir:'./dist'
      },
    });
    done();
}


// WATCH FILE
function watchFiles(){
    watch("src/**/*.html", series(html, reload))
    watch("src/assets/**/*.scss", series(scss, reload))
    watch( "src/assets/**/*.svg",  series(img, reload))
}



// TAREFAS
const limpar = series(cleanDist);
const develop = parallel(html, scss, img);
const build = () => {
    return pathExists.sync('dist') ? series(limpar, develop) : develop;
}

// EXPORTAÇÔES
module.exports = {
    limpar,
    dev: series(develop, server, watchFiles),
    default: develop,
    build: build()
}
