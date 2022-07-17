import { Neovim } from "neovim";
import { AutocmdOptions } from 'neovim/lib/host/NvimPlugin'

const linesToString = (lines:string[]) => (lines.length === 1 ? lines[0] : lines.reduce((previous, current) => `${previous}\n${current}`, '')).trim();

let nvim:Neovim

export const autoCmdOptions:AutocmdOptions = {pattern:'*'};

export const initNvim = (nvimInstance:Neovim)=>{
  if (!!nvim) return 
  nvim = nvimInstance
}

export const getBufText= async():Promise<string>=>{
  if(!nvim) throw new Error('nvim instance not initialized')
  const buf = await nvim.buffer;
  const lines = await buf.lines
  const bufText = linesToString(lines)
  return bufText
}

export const print = (text:string|number)=>{
  nvim.lua(`print('${text}')`)
}
