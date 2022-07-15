import * as neovim from 'neovim'
import { AutocmdOptions } from 'neovim/lib/host/NvimPlugin'

const linesToString = (lines:string[]) => lines.reduce((previous, current) => `${previous}\n${current}`, '');

export const foo = (plugin:neovim.NvimPlugin)=>{
  const opts:AutocmdOptions = {pattern:'*'};
  const {nvim} = plugin;
  plugin.registerAutocmd('TextChangedI',async()=>{
  const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    nvim.lua(`print('buffer contains ${bufText.length} chars')`)
  },opts)
}
