import * as neovim from 'neovim'
import { AutocmdOptions } from 'neovim/lib/host/NvimPlugin'
import { distanceAsPercentage } from './levenshtein';

const opts:AutocmdOptions = {pattern:'*'};
const linesToString = (lines:string[]) => lines.length===1 ? lines[0] : lines.reduce((previous, current) => `${previous}\n${current}`, '');
const template = "This is some sample text!"

export = (plugin:neovim.NvimPlugin)=>{
  const print = (text:string|number)=>{
    plugin.nvim.lua(`print('${text}')`)
  }
  const compareBufferTextToTemplate = async ()=>{
    const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    print(`${distanceAsPercentage(bufText,template)}% similarity`)
  }

  const {nvim} = plugin;
  plugin.registerAutocmd('TextChangedI',async()=>{
    await compareBufferTextToTemplate()
  },opts)
  plugin.registerAutocmd('TextChanged',async()=>{
    await compareBufferTextToTemplate()
  },opts)
}
