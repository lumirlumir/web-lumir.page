/* eslint-disable no-param-reassign */
const ESLintPlugin = require('eslint-webpack-plugin');

/**
 * Tidory Configuration
 * https://tidory.com/docs/configuration
 */
module.exports = {
  ts_session: '',
  url: '',

  preview: {
    /**
     * homeType
     *
     * NONE
     * COVER
     */
    homeType: 'NONE',

    /**
     * Preview Mode
     *
     * index
     * entry
     * category
     * tag,
     * location
     * media,
     * guestbook
     */
    mode: 'index',
  },

  /**
   * Build
   */
  build: {
    /**
     * Assets public path
     */
    public_path: '',
  },

  /**
   * Webpack Configuration
   *
   * @param {object} webpackConfig
   */
  extends(webpackConfig) {
    webpackConfig.plugins = [new ESLintPlugin(), ...webpackConfig.plugins];
    webpackConfig.module.rules = [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      ...webpackConfig.module.rules,
    ];
  },
};
