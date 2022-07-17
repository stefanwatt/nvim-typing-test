import * as neovim from 'neovim'
import { AutocmdOptions } from 'neovim/lib/host/NvimPlugin'
import { getDistanceAsPercentage } from './levenshtein';
import {StopWatch} from 'stopwatch-node'

const opts:AutocmdOptions = {pattern:'*'};
const linesToString = (lines:string[]) => (lines.length === 1 ? lines[0] : lines.reduce((previous, current) => `${previous}\n${current}`, '')).trim();
const template = `
  const compareBufferTextToTemplate = async ()=>{
    const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    print(\`\${distanceAsPercentage(bufText,template)}% similarity\`)
  }
`.trim()
const stopwatch = new StopWatch()

export = (plugin:neovim.NvimPlugin)=>{
  const print = (text:string|number)=>{
    plugin.nvim.lua(`print('${text}')`)
  }
  const startTypingTest = ()=>{
    stopwatch.start()
  }
  const completeTest = ()=>{
    stopwatch.stop()
    print(stopwatch.shortSummary())

  }
  const compareBufferTextToTemplate = async ()=>{
    if (!stopwatch.isRunning()) return;
    const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    const distanceAsPercentage = getDistanceAsPercentage(bufText,template)
    if(distanceAsPercentage === 100) {
      completeTest()
      return
    }
    print(`${distanceAsPercentage}% similarity`)
  }

  const {nvim} = plugin;
  plugin.registerCommand('TypingTestStart', startTypingTest)
  plugin.registerAutocmd('TextChangedI',async()=>{
    await compareBufferTextToTemplate()
  },opts)
  plugin.registerAutocmd('TextChanged',async()=>{
    await compareBufferTextToTemplate()
  },opts)
}
