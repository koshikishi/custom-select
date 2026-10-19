import {rmSync} from 'node:fs';
import {src, dest, watch, series, parallel} from 'gulp';
import plumber from 'gulp-plumber';
import htmlmin from 'gulp-html-minifier-terser';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import postcssNormalize from 'postcss-normalize';
import postcssLightningcss from 'postcss-lightningcss';
import rename from 'gulp-rename';
import {createGulpEsbuild} from 'gulp-esbuild';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import {create} from 'browser-sync';

const PATH_TO_SOURCE = 'src';
const PATH_TO_DIST = 'build';
const Path = {
  Source: {
    ROOT: PATH_TO_SOURCE,
    STYLES: `${PATH_TO_SOURCE}/scss`,
    SCRIPTS: `${PATH_TO_SOURCE}/js`,
  },
  Dist: {
    ROOT: PATH_TO_DIST,
    STYLES: `${PATH_TO_DIST}/css`,
    SCRIPTS: `${PATH_TO_DIST}/js`,
  },
};

const sass = gulpSass(dartSass);
const server = create();

let isProduction = false;

/**
 * Processes *.html files.
 */
const processMarkup = () => src(`${Path.Source.ROOT}/*.html`)
  .pipe(plumber())
  .pipe(htmlmin({
    collapseWhitespace: isProduction,
    minifyCSS: isProduction,
    minifyJS: isProduction,
  }))
  .pipe(dest(Path.Dist.ROOT))
  .pipe(server.stream());

/**
 * Compiles a stylesheet from *.scss files.
 */
const processStyles = () => src(`${Path.Source.STYLES}/style.scss`, {
  sourcemaps: !isProduction,
})
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([
    postcssNormalize(),
    postcssLightningcss({
      lightningcssOptions: {
        minify: isProduction,
      },
    }),
  ]))
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(dest(Path.Dist.STYLES, {
    sourcemaps: !isProduction,
  }))
  .pipe(server.stream());

/**
 * Bundles *.js script files.
 */
const processScripts = () => {
  const esbuild = createGulpEsbuild({incremental: !isProduction});

  return src(`${Path.Source.SCRIPTS}/main.js`)
    .pipe(plumber())
    .pipe(esbuild({
      entryPoints: [`${Path.Source.SCRIPTS}/main.js`],
      bundle: true,
      format: 'esm',
      outfile: 'main.min.js',
      target: browserslistToEsbuild(),
      minify: isProduction,
      sourcemap: !isProduction,
    }))
    .pipe(dest(Path.Dist.SCRIPTS))
    .pipe(server.stream());
};

/**
 * Starts the server.
 */
const startServer = () => {
  server.init({
    ui: false,
    server: Path.Dist.ROOT,
    cors: true,
    notify: false,
  });

  watch(`${Path.Source.ROOT}/*.html`, processMarkup);
  watch(`${Path.Source.STYLES}/**/*.scss`, processStyles);
  watch(`${Path.Source.SCRIPTS}/**/*.js`, processScripts);
};

/**
 * Removes the build directory.
 */
const removeBuild = (done) => {
  rmSync(Path.Dist.ROOT, {
    force: true,
    recursive: true,
  });
  done();
};

/**
 * Builds the project for production.
 */
const buildProduction = (done) => {
  isProduction = true;
  series(
    removeBuild,
    parallel(
      processMarkup,
      processStyles,
      processScripts,
    ),
  )(done);
};

/**
 * Builds the project and starts the server for development.
 */
const startDevelopment = (done) => {
  series(
    removeBuild,
    parallel(
      processMarkup,
      processStyles,
      processScripts,
    ),
    startServer,
  )(done);
};

export {
  processMarkup as markup,
  processStyles as styles,
  processScripts as scripts,
  startServer as server,
  removeBuild as clean,
  buildProduction as build,
  startDevelopment as start,
};
