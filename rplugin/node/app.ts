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
  const startTypingTest = async ()=>{
    stopwatch.start()
    setInterval(async()=>{
      if (!stopwatch.isRunning()) return
      const bufText = await getBufText()
      const distanceAsPercentage = getDistanceAsPercentage(bufText, template)
      print(statusText(distanceAsPercentage))
    },1000)
  }

  const completeTest = ()=>{
    stopwatch.stop()
    print(`Test completed in ${Math.round(stopwatch.getTotalTime()/1000)} seconds`)
  }

  const statusText = (distanceAsPercentage:number)=> {
    if (!stopwatch.isRunning())
      return 'Test not started'
    else {
      return `${stopwatch.shortSummary()} - ${distanceAsPercentage}% similarity`
    }
  }

  const getBufText = async ()=>{
    const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    return bufText
  }

  const compareBufferTextToTemplate = async ()=>{
    if (!stopwatch.isRunning()) return;
    const bufText = await getBufText()
    const distanceAsPercentage = getDistanceAsPercentage(bufText,template)
    if(distanceAsPercentage === 100) {
      completeTest()
      return
    }
    print(statusText(distanceAsPercentage))
  }

  const {nvim} = plugin;
  plugin.registerCommand('TypingTestStart', startTypingTest,{sync:false})
  plugin.registerAutocmd('TextChangedI',compareBufferTextToTemplate,opts)
  plugin.registerAutocmd('TextChanged',compareBufferTextToTemplate,opts)
}
