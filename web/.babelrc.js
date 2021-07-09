const presets = ['react-app'];

const plugins = [
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/core',
      libraryDirectory: 'esm',
      camel2DashComponentName: false
    },
    'core'
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@material-ui/icons',
      libraryDirectory: 'esm',
      camel2DashComponentName: false
    },
    'icons'
  ],
  [
    'i18next-extract',
    {
      defaultNS: 'translation',
      locales: ['en', 'es'],
      keyAsDefaultValue: true,
      keyAsDefaultValueForDerivedKeys: true,
      keySeparator: '.',
      nsSeparator: ':',
      outputPath: 'public/locales/{{locale}}/{{ns}}.json'
    }
  ]
];

module.exports = {
  presets,
  plugins
};
