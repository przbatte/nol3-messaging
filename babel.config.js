module.exports = function (api) {

  api.cache(true)

  const config = {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      ['@babel/transform-runtime'],
    ],
    env: {
      coverage: {
        plugins: [
          [
            'istanbul', {
              exclude: [
                '**/*.test.js',
              ],
            },
          ],
        ],
      },
      build: {
        ignore: [
          '**/*.test.js',
        ],
      }
    },
  }

  return config
}
