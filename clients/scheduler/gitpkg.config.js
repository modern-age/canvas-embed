module.exports = () => ({
  registry: 'git@github.com:modern-age/canvas-embed.git',
  getTagName: pkg => `scheduler-v${pkg.version}`,
})
