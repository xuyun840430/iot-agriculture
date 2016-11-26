var _ = require('lodash');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
var webpack = require("webpack");

var buildPath = path.join(__dirname, "..", "public", "build");

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
      "presets": ["es2015", "react", "stage-0"],
      "plugins": [
        "transform-react-remove-prop-types",
        "transform-react-constant-elements"
      ]
    },
    include: path.join(__dirname, '..', 'app'),
    exclude: path.join(__dirname, '/node_modules/')
  },
  { test: /\.json$/, loader: "json-loader" },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url',
    query: {
      name: '[hash].[ext]',
      limit: 10000,
    }
  },
  { test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module!postcss-loader')
  }
];

var postCSSConfig = function() {
  return [
    require('postcss-import')(),
    // Note: you must set postcss-mixins before simple-vars and nested
    require('postcss-mixins')(),
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

module.exports = [
  {
    // The configuration for the client
    name: "browser",
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
    // A SourceMap is emitted.
    devtool: "source-map",
    context: rootDir, //path.join(__dirname, "..", "app"),
    resolve: {
      alias: aliases,
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        'app', 'node_modules'
      ]
    },
    // entry: _.merge({
    //     app: ['./index', hotMiddlewareScript]
    //   },
    //   scripts.chunks),
    entry: _.merge({
        bundle: './app/index'
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
          test: /\.less$/,
          exclude: [/node_modules/],
          loader: 'style!css!less!autoprefixer-loader?browsers=last 10 versions'

        }
      ]),
      noParse: _.values(_.pick(aliases, scripts.noParse))
    },
    plugins: [
      // extract inline css from modules into separate files
      new ExtractTextPlugin("styles/main.css"),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        __DEVCLIENT__: false,
        __DEVSERVER__: false
      }),
      new InlineEnviromentVariablesPlugin({ NODE_ENV: 'production' }),
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js", Infinity)
    ],
    postcss: postCSSConfig
  }, {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "..", "app"),
    entry: {
      server: "./server"
    },
    target: "node",
    output: {
      // The output directory as absolute path
      path: buildPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "server.js",
      // The output path from the view of the Javascript
      publicPath: "/build/",
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: commonLoaders.concat([
        {
          test: /\.css$/,
          loader: 'css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
        }
      ])
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
      // Order the modules and chunks by occurrence.
      // This saves space, because often referenced modules
      // and chunks get smaller ids.
      new webpack.optimize.OccurenceOrderPlugin(),
      new ExtractTextPlugin("styles/main.css"),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        __DEVCLIENT__: false,
        __DEVSERVER__: false
      }),
      new InlineEnviromentVariablesPlugin({ NODE_ENV: 'production' })
    ],
    postcss: postCSSConfig
  }
];
