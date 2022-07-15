import * as neovim from 'neovim'
import { AutocmdOptions } from 'neovim/lib/host/NvimPlugin'

const linesToString = (lines:string[]) => lines.reduce((previous, current) => `${previous}\n${current}`, '');
const sampleText = "This is some sample text!"

export = (plugin:neovim.NvimPlugin)=>{
  const print = (text:string)=>{
    plugin.nvim.lua(`print('${text}')`)
  }
  const opts:AutocmdOptions = {pattern:'*'};
  const {nvim} = plugin;
  plugin.registerAutocmd('TextChanged',async()=>{
  const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    if (bufText.includes(sampleText)) print("success")
  },opts)
}
