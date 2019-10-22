module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'import',
      { libraryName: 'vant', libraryDirectory: 'es', style: name => `${name}/style/less` }, // name => `${name}/style/less`
      'vant'
    ]
  ]
}
