import * as neovim from 'neovim'
import { AutocmdOptions } from 'neovim/lib/host/NvimPlugin'
import { Stopwatch } from 'ts-stopwatch';
import { getDistanceAsPercentage } from './levenshtein';

//
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
const stopwatch = new Stopwatch()

export = (plugin:neovim.NvimPlugin)=>{
  try {
    
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
      print(stopwatch.getTime())
    },1000)
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
  plugin.registerCommand('TypingTestStart',startTypingTest,{sync:false})
  plugin.registerAutocmd('TextChangedI',compareBufferTextToTemplate,opts)
  plugin.registerAutocmd('TextChanged',compareBufferTextToTemplate,opts)

  const getSeconds = ():number=>{
    return Math.round(stopwatch.getTime()/1000)
  }
  const completeTest = ()=>{
    stopwatch.stop()
    print(`Test completed in ${getSeconds} seconds`)
  }

  const statusText = (distanceAsPercentage:number)=> {
    if (!stopwatch.isRunning())
      return 'Test not started'
    else {
      return `${getSeconds()} s - ${distanceAsPercentage}% similarity`
    }
  }

  const getBufText = async ()=>{
    const buf = await nvim.buffer;
    const lines = await buf.lines
    const bufText = linesToString(lines)
    return bufText
  }
  } catch (error) {
    console.log ('there was an error')
     console.log(error)   
  }
}
