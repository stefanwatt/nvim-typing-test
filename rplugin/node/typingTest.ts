import { stopwatch,getSeconds } from './stopwatch';
import {print, getBufText} from './nvim';
import { getDistanceAsPercentage } from './levenshtein';

const template = `
const compareBufferTextToTemplate = async ()=>{
  const buf = await nvim.buffer;
  const lines = await buf.lines
  const bufText = linesToString(lines)
  print(\`\${distanceAsPercentage(bufText,template)}% similarity\`)
}`.trim()

const statusText = (distanceAsPercentage:number)=> {
  if (!stopwatch.isRunning())
    return 'Test not started'
  else {
    return `${getSeconds()} s elapsed- ${distanceAsPercentage}% similarity`
  }
}

export const startTypingTest = async ()=>{
  stopwatch.start()
  setInterval(async()=>{
    if (!stopwatch.isRunning()) return
    const bufText = await getBufText()
    const distanceAsPercentage = getDistanceAsPercentage(bufText, template)
    print(statusText(distanceAsPercentage))
  },1000)
}

export const compareBufferTextToTemplate = async ()=>{
  if (!stopwatch.isRunning()) return;
  const bufText = await getBufText()
  const distanceAsPercentage = getDistanceAsPercentage(bufText,template)
  if(distanceAsPercentage === 100) {
    completeTest()
    return
  }else{
    print(statusText(distanceAsPercentage))
  }
}

export const completeTest = ()=>{
  stopwatch.stop()
  print(`Test completed in ${getSeconds} seconds`)
  stopwatch.reset()
}

