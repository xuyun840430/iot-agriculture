var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var buildPath = path.join(__dirname, '..', 'public', 'build');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

// Configuration for pack all third party js files
// if (argv.inline && argv.hot) {
//   scripts.aliases.react = "/node_modules/react/react.js" // for better debug
// }
var scripts = require('./scripts');
var rootDir = path.resolve(__dirname, '../');
var node_modules = path.resolve(rootDir, 'node_modules');
var aliases = _.mapValues(scripts.aliases, function (scriptPath) {
  return path.resolve(rootDir + scriptPath)
});

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      "presets": ["react-hmre", "es2015", "react", "stage-0"]
    },
    include: path.join(__dirname, '..', 'app'),
    exclude: path.join(__dirname, '/node_modules/')
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url',
    query: {
      name: '[hash].[ext]',
      limit: 10000,
    }
  },
  { test: /\.html$/, loader: 'html-loader' }
];

var postCSSConfig = function () {
  return [
    require('postcss-import')({
      path: path.join(__dirname, '..', 'app', 'css'),
      // addDependencyTo is used for hot-reloading in webpack
      addDependencyTo: webpack
    }),
    require('postcss-simple-vars')(),
    // Unwrap nested rules like how Sass does it
    require('postcss-nested')(),
    //  parse CSS and add vendor prefixes to CSS rules
    require('autoprefixer')({
      browsers: ['last 2 versions', 'IE > 8']
    }),
    // A PostCSS plugin to console.log() the messages registered by other
    // PostCSS plugins
    require('postcss-reporter')({
      clearMessages: true
    })
  ];
};

module.exports = {
  // eval - Each module is executed with eval and //@ sourceURL.
  devtool: 'eval',
  // The configuration for the client
  name: 'browser',
  /* The entry point of the bundle
   * Entry points for multi page app could be more complex
   * A good example of entry points would be:
   * entry: {
   *   pageA: "./pageA",
   *   pageB: "./pageB",
   *   pageC: "./pageC",
   *   adminPageA: "./adminPageA",
   *   adminPageB: "./adminPageB",
   *   adminPageC: "./adminPageC"
   * }
   *
   * We can then proceed to optimize what are the common chunks
   * plugins: [
   *  new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
   *  new CommonsChunkPlugin("common.js", ["pageA", "pageB", "admin-commons.js"], 2),
   *  new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]);
   * ]
   */
  context: rootDir, //path.join(__dirname, '..', 'app')
  resolve: {
    alias: aliases,
    extensions: ['', '.js', '.jsx', '.css', '.md'],
    modulesDirectories: [
      'app', 'node_modules'
    ]
  },

  // Multiple entry with hot loader
  // https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
  // entry: {
  //   app: ['./app/index', hotMiddlewareScript]
  // },

  entry: _.merge({
    bundle: ['./app/index', hotMiddlewareScript]
  },
    scripts.chunks),

  output: {
    // The output directory as absolute path
    path: buildPath,
    //path: path.resolve(__dirname, '../public/build'),
    // The filename of the entry chunk as relative path inside the output.path directory
    // filename: '[name].js',
    filename: '[name].js',
    chunkFilename: 'chunk.[id].js',
    // The output path from the view of the Javascript, must with '/build/' (/b..)
    publicPath: '/build/'
    // pathinfo: true,
  },
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\.css$/,
        loader: 'style!css?module&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/],
        loader: 'style!css!less!autoprefixer-loader?browsers=last 10 versions'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      // {
      //   test: /\.md$/,
      //   loader: 'raw-loader'
      // }
    ]),
    noParse: _.values(_.pick(aliases, scripts.noParse))
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js", Infinity)
  ],
  postcss: postCSSConfig
};
