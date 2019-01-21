module.exports = {
  ...require('./spacings.js'),
  ...require('./colors.js').mainColors,
  ...require('./colors.js').statusColors,
  ...require('./colors.js').otherColors,
  ...require('./typography.js').fontFamilies,
  ...require('./typography.js').fontSizes,
  ...require('./typography.js').fontWeights,
  ...require('./transitions.js').transitionDuration,
}
