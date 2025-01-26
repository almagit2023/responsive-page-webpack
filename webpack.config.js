const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  // const isProduction = argv.mode === 'build';

  return {
    mode: argv.mode,
    entry: './main.css',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, isProduction ? 'prod' : 'build'), // Dynamic folder based on mode
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]', // Keep original name
                outputPath: 'assets/images/', // Place images in a specific directory
              },
            },
          ],
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'assets', to: 'assets' } // Copy the whole assets folder
        ],
      }),
    ],
    devServer: {
      static: path.join(__dirname, 'build'), // Serve from the development build folder
      compress: true,
      port: 9000,
    }
  };
};