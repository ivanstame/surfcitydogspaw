// Imports
const gulp = require('gulp');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const revDelete = require('gulp-rev-delete-original');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const filter = require('gulp-filter');
var newhtmlFilter = filter(['**/*', '!**/*.html'], { restore: true });


// Hash filenames, Delete unhashed filenames and Update new references to hashed filenames
gulp.task('hash-filenames', function(done){
    console.log("Executing hash-filenames gulp task...");

    // Fetch files we want to change (namefile)
    return gulp.src(["dist/**/*.html",
            "dist/**/*.css",
            "dist/**/*.js",
            "dist/**/*.{jpg,png,jpeg,gif,svg}"], { base: 'dist' })
        // Generates and concatenate a hash to the filenames
        .pipe(newhtmlFilter)
        .pipe(rev())
        .pipe(newhtmlFilter.restore)
        // Update new hashed filenames references
        .pipe(revReplace())
        // Pushes the new updates into the dist folder
        .pipe(gulp.dest('dist'))
        // Delete files previous files without hash
        .pipe(revDelete())

        //.pipe(rev.manifest())
        //.pipe(gulp.dest('dist'));
        done();

    console.log("hash-filenames gulp task finished");
});


//Gult tast to minify CSS files
gulp.task('minify-css', (done) => {
  gulp.src('app/css/**/*.css', {base: 'app'})
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
    done();
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function(done) {
  return gulp.src('app/js/**/*.js', {base: 'app'})
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('dist'))
    done();
});

// Gulp task to minify HTML files
gulp.task('pages', function(done) {
  return gulp.src(['**/*.html'], {base: 'app'})
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'));
    done();
});


//Copies images from app folder into dist folder....RUN BEFORE HASH REVVING
gulp.task('image-transfer', function(done){
    return gulp.src(['app/**/*.{jpg,png,jpeg,gif,svg}'], {base:'app'})
      .pipe(gulp.dest('dist'));
      done();
});

gulp.task('clean', () => del(['dist']));

gulp.task('sequence', gulp.series('minify-css', 'scripts','pages'));

//RUN BEFORE HASH REVVING
gulp.task('minimizer', gulp.series('clean', 'sequence'));





gulp.task('default', gulp.series('minimizer', 'image-transfer', 'hash-filenames'));
