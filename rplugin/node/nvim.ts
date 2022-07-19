import * as Path from 'path'
import { Neovim } from 'neovim'
import { AutocmdOptions } from 'neovim/lib/host/NvimPlugin'

const linesToString = (lines: string[]) =>
  (lines.length === 1
    ? lines[0]
    : lines.reduce((previous, current) => `${previous}\n${current}`, '')
  ).trim()

let nvim: Neovim

export const autoCmdOptions: AutocmdOptions = { pattern: '*' }

export const initNvim = (nvimInstance: Neovim) => {
  if (!!nvim) return
  nvim = nvimInstance
}

export const getBufText = async (): Promise<string> => {
  const buf = await nvim.buffer
  const lines = await buf.lines
  const bufText = linesToString(lines)
  return bufText
}

export const setBufText = async (text: string) => {
  await nvim.outWrite(text)
}

export const print = async (text: string | number) => {
  await nvim.lua(`print('${text}')`)
}

export const hSplit = async () => {
  await nvim.command('sp')
}

export const duplicateCurrentBuf = async () => {
  const bufText = await getBufText()
  const path = Path.parse(await getBufFilepath())
  const bufFileDir = path.dir
  const bufFileName = path.name
  await hSplit()
  await nvim.command(`e ${bufFileDir}/typing_test_${bufFileName}`)
  await setBufText(bufText)
}
const getBufFilepath = async (): Promise<string> => {
  const getFilepathCmd = 'lua print(vim.api.nvim_buf_get_name(0))'
  const filepath = await nvim.commandOutput(getFilepathCmd)
  return filepath
}
