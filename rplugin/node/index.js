const linesToString = (lines) => lines.reduce((previous, current) => `${previous}\n${current}`, '');

module.exports = plugin => {
  const opts= {pattern:'*'};
  const {nvim} = plugin;
  plugin.registerAutocmd('TextChangedI',async()=>{
  const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    nvim.lua(`print('buffer contains ${bufText.length} chars')`)
  },opts)
}
