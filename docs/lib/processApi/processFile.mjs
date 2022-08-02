import { ProjectParser } from 'typedoc-json-parser'
import { readFileSync } from 'fs'
import path from 'path'
import { json } from 'stream/consumers'

// function main(){

const dir = path.resolve(process.cwd(), 'generated','json', 'api.json')
const file = readFileSync(dir, 'utf-8')
const data = JSON.parse(file)
const project =new ProjectParser(data)
// }
console.log(JSON.stringify(project))
// export default main
