const linesToString = (lines) => lines.reduce((previous, current) => `${previous}\n${current}`, '');
const sampleText = "This is some sample text!"
module.exports = plugin => {
  const print = (text)=>{
    plugin.nvim.lua(`print('${text}')`)
  }
  const opts= {pattern:'*'};
  const {nvim} = plugin;
  plugin.registerAutocmd('TextChangedI',async()=>{
  const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    if (bufText === sampleText) print("success")
  },opts)
}
