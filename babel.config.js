const presets = [
  ['@babel/preset-env', { // какой пресет использовать
    targets: { // какие версии браузеров поддерживать
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },

    // добавлять полифилы core-js@3 по мере использования в коде
    useBuiltIns: "usage",
    corejs: 3
  }]
];

module.exports = { presets };
