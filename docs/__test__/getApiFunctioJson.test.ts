import { getApiFunctionJson } from '../lib/processApi/getApiFunctionJson.js'
import entity from './data/deleteExcludedDirectoryName.json'
import fsaDb from './data/fsaDb.json'

describe('getApiFunctionJson', () => {
    const result = getApiFunctionJson(entity, fsaDb)
    console.log(JSON.stringify(result))
  test('it has name', () => {
    expect(result.name).toBe('deleteExcludedDirectoryName')
  })
  test('to have params named id',()=>{
    expect(result.params.length).toBe(1)
    // expect(result.params[0].text).toBe('id')
  })
})
export {}
