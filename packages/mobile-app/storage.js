import MMKVStorage from 'react-native-mmkv-storage'

const MMKV = new MMKVStorage.Loader().initialize()

const STORAGE_KEY = 'scanHistory'

export async function getHistory() {
  const value = await MMKV.getArrayAsync(STORAGE_KEY)
  return value.filter(item => typeof item === 'string') || []
}

export async function storeScan(code) {
  const history = await getHistory()
  const nextValue = [code, ...history].filter((item, index, src) => src.indexOf(item) === index).slice(0, 20)
  await MMKV.setArrayAsync(STORAGE_KEY, nextValue)
  return nextValue
}
