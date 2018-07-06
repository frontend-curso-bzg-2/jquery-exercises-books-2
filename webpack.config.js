const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {                
        app: "./src/js/index.ts"
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test:  /\.txt$/, use: 'raw-loader'
            },
            {
                test: /\.css$/, use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/, use: 'file-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({template: "./index.html", title: "Bzg Books App"}),        
        new CopyWebpackPlugin([
            {
              from: './src/components/*',
              to: 'components/[name].[ext]',
              toType: 'template'
            }
          ]),
        new CopyWebpackPlugin([
            {
              from: './src/components/templates/*',
              to: 'components/templates/[name].[ext]',
              toType: 'template'
            }
          ], { ignore: [ '*.js', '*.css' ] }),
          new CopyWebpackPlugin([
            {
              from: './src/data/books.json',
              to: 'data/books.json',
              toType: 'file'
            }
          ], { ignore: [ '*.html', '*.css' ] }),
        new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
        }),
        new webpack.ProvidePlugin({
            Ractive: ['ractive/ractive.min.js', 'default'],           
        })
    ],    
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
    mode: "production"
}