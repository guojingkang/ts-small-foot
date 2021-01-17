const path = require('path');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const chalk = require('chalk');
const through = require('through2');
const newer = require('gulp-newer');
const currProjectDir = process.cwd();
const _ = require('lodash');

function build(){
    const tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(newer({
            dest: 'lib',
            ext: '.js'
        }))
        .pipe(through.obj((file, encode, callback) => {
            console.log('Building', `'${chalk.cyan(path.relative(currProjectDir, file.path))}'...`);
            callback(null, file);
        }))
        .pipe(tsProject())
        .js.pipe(gulp.dest('lib'));
}

gulp.task('build',build)