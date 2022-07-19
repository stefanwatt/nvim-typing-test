import { stopwatch, getSeconds } from './stopwatch'
import { print, getBufText, duplicateCurrentBuf, setBufText } from './nvim'
import { getDistanceAsPercentage } from './levenshtein'

let template = `
const compareBufferTextToTemplate = async ()=>{
  const buf = await nvim.buffer;
  const lines = await buf.lines
  const bufText = linesToString(lines)
  print(\`\${distanceAsPercentage(bufText,template)}% similarity\`)
}`.trim()

const statusText = (distanceAsPercentage: number) => {
  if (!stopwatch.isRunning()) return 'Test not started'
  else {
    return `${getSeconds()} s elapsed- ${distanceAsPercentage}% similarity`
  }
}

const completeTest = async () => {
  await print(`Test completed in ${getSeconds()} seconds`)
  stopwatch.stop()
  stopwatch.reset()
}

const stopwatchCycle = () => {
  setTimeout(async () => {
    await compareBufferTextToTemplate()
    if (stopwatch.isRunning()) {
      stopwatchCycle()
    }
  }, 1000)
}

export const compareBufferTextToTemplate = async () => {
  if (!stopwatch.isRunning()) return
  const bufText = await getBufText()
  const distanceAsPercentage = getDistanceAsPercentage(bufText, template)
  if (distanceAsPercentage === 100) {
    await completeTest()
    return
  } else {
    await print(statusText(distanceAsPercentage))
  }
}

export const startTypingTest = async () => {
  const bufText = await getBufText()
  await duplicateCurrentBuf()
  template = bufText
  stopwatch.start()
  stopwatchCycle()
}

export const quitTypingTest = async () => {
  await print(`Test aborted after ${getSeconds()} seconds`)
  stopwatch.stop()
  stopwatch.reset()
}
