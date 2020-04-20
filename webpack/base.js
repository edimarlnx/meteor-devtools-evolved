const path = require('path');
const merge = require('webpack-merge');
const { DefinePlugin } = require('webpack');
const { getTypeScriptAliases } = require('./utils');

const src = path.join(__dirname, '../src/');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const aliases = getTypeScriptAliases();

module.exports = override =>
  merge(
    {
      entry: {
        bundle: path.resolve(src, 'App.tsx'),
        inject: path.resolve(src, 'Browser', 'Inject.ts'),
        background: path.resolve(src, 'Browser', 'Background.ts'),
        content: path.resolve(src, 'Browser', 'Content.ts'),
        devtools: path.resolve(src, 'Browser', 'DevTools.ts'),
      },

      output: {
        filename: '[name].js',
        path: path.join(__dirname, '../chrome/build/'),
        publicPath: '/build/',
      },

      plugins: [
        new CleanWebpackPlugin(),

        new DefinePlugin({
          'process.env.MODE': JSON.stringify(override.mode),
        }),
      ],

      module: {
        rules: [
          {
            parser: {
              amd: false,
            },
          },
          {
            test: /\.js/,
            loader: 'babel-loader',
            include: src,
          },
          { test: /\.tsx?$/, loader: 'ts-loader' },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader',
          },
          {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/',
                },
              },
            ],
          },
          {
            test: /\.(gif)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'assets/',
                },
              },
            ],
          },
        ],
      },

      resolve: {
        alias: aliases,

        extensions: [
          '.css',
          '.eot',
          '.js',
          '.json',
          '.jsx',
          '.mjs',
          '.sass',
          '.scss',
          '.ttf',
          '.gif',
          '.ts',
          '.tsx',
          '.woff',
        ],
      },

      performance: {
        hints: false,
      },
    },
    override,
  );
