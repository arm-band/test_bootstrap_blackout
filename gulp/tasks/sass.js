const _         = require('../plugin');
const dir       = require('../dir');
_.sass.compiler = require('sass');
const Fiber = require('fibers');

//scssコンパイルタスク
const scss = () => {
    return _.gulp.src(
        `${dir.src.scss}/**/*.scss`,
        {
            ignore: [
                `${dir.src.scss}${dir.src.scssassets}/bootstrap/bootstrap.scss`,
                `${dir.src.scss}${dir.src.scssassets}/bootstrap/honoka/bootstrap/**`,
                `${dir.src.scss}${dir.src.scssassets}/bootstrap/honoka/honoka/**`
            ]
        }
    )
        .pipe(_.plumber({
            errorHandler: _.notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'scss'
            })
        }))
        .pipe(_.sass({
            fiber: Fiber,
            outputStyle: 'compressed'
        }).on('error', _.sass.logError))
        .pipe(_.autoprefixer({
            cascade: false
        }))
        .pipe(_.gulp.dest(dir.dist.css));
};

module.exports = _.gulp.series(scss);
