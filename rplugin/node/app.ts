import * as neovim from 'neovim'
import { AutocmdOptions } from 'neovim/lib/host/NvimPlugin'
import { distanceAsPercentage } from './levenshtein';

const opts:AutocmdOptions = {pattern:'*'};
const linesToString = (lines:string[]) => lines.reduce((previous, current) => `${previous}\n${current}`, '');
const sampleText = "This is some sample text!"

export = (plugin:neovim.NvimPlugin)=>{
  const print = (text:string|number)=>{
    plugin.nvim.lua(`print('${text}')`)
  }
  const {nvim} = plugin;
  plugin.registerAutocmd('TextChanged',async()=>{
  const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    print(`${distanceAsPercentage(bufText,sampleText)}% similarity`)
  },opts)
}
