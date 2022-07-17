import * as neovim from 'neovim'
import { autoCmdOptions, initNvim} from './nvim';
import { compareBufferTextToTemplate, startTypingTest } from './typingTest';

export = (plugin:neovim.NvimPlugin)=>{
  initNvim(plugin.nvim)
  plugin.registerCommand('TypingTestStart',startTypingTest,{sync:false})
  plugin.registerAutocmd('TextChangedI',compareBufferTextToTemplate,autoCmdOptions)
  plugin.registerAutocmd('TextChanged',compareBufferTextToTemplate,autoCmdOptions)
}
