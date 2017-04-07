const path = require("path");

const babel = require("./config/babel");
const uglify = require('./config/uglify');

//** constants **//

const env = process.env.NODE_ENV || 'development';
const isProd = (env === 'production');
const out = path.join(__dirname, "./dist");
const exclude = /(node_modules|bower_components)/;

//** webpack plugins **//

const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const HTML = require('html-webpack-plugin');

const ExtractText = require("extract-text-webpack-plugin");
const extractCss = new ExtractText("styles.[hash].css");

const plugins = [
    new Clean(['dist']),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(env)}),
    new HTML({template: 'src/index.html', inject: true, minify: isProd ? {
        removeComments: true,
        collapseWhitespace: true
      } : false}),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                require('autoprefixer')({
                    browsers: ['last 3 Chrome versions', 'last 3 iOS versions', 'last 3 Edge versions']
                })
            ]
        }
    }),
    extractCss
];

if (isProd) {
    plugins.push(
        new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
        new webpack.optimize.UglifyJsPlugin(uglify)
    );

    babel.presets.push("babili");
} else {
    // dev only
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    );
}

module.exports = {
    entry: {
        app: "./src/index.js",
        vendor: Object.keys(require("./package.json")["dependencies"])
    },
    output: {
        path: out,
        filename: "[name].[hash].js",
        publicPath: "./"
    },
    module: {
        rules: [
      {
        test: /\.jsx?$/,
        exclude: exclude,
        loader: "babel-loader",
        options: babel
      },
      {
        test: /\.scss$/,
        loader: isProd ? extractCss.extract({
          use: "css-loader?modules!postcss-loader!sass-loader"
        }) : "style-loader!css-loader?modules!postcss-loader!sass-loader",
        exclude: /shell.scss/
      },
      {
        test: /\.(png|svg)$/,
        loader: "file-loader",
        exclude: exclude
      }
    ]
    },
    resolve: {
      alias: {
        "src": path.resolve(__dirname, "./src")
      }
    },
    plugins: plugins,
    devtool: !isProd && "eval",
    devServer: {
    publicPath: "/",
        contentBase: out,
        port: process.env.PORT || 3000,
        historyApiFallback: true,
        compress: isProd,
        inline: !isProd,
        hot: !isProd
    }
};
