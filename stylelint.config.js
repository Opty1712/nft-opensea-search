module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-styled-components'],
  processors: [
    [
      'stylelint-processor-styled-components',
      {
        parserPlugins: [
          'jsx',
          'objectRestSpread',
          ['decorators', { decoratorsBeforeExport: true }],
          'classProperties',
          'exportExtensions',
          'asyncGenerators',
          'functionBind',
          'functionSent',
          'dynamicImport',
          'optionalCatchBinding',
          'optionalChaining',
          'nullishCoalescingOperator'
        ]
      }
    ]
  ],
  rules: {
    'declaration-colon-newline-after': null
  }
};
