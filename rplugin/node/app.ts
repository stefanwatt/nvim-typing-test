import * as neovim from 'neovim'
import { AutocmdOptions } from 'neovim/lib/host/NvimPlugin'

const linesToString = (lines:string[]) => lines.reduce((previous, current) => `${previous}\n${current}`, '');

export default (plugin:neovim.NvimPlugin)=>{
  const opts:AutocmdOptions = {pattern:'*'};
  const {nvim} = plugin;
  plugin.registerAutocmd('TextChangedI',async()=>{
  const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    console.log('buffer text changed :\n'+bufText)
  },opts)
}
