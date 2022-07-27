import fs from 'fs'
import path from 'path'
import { ParsedUrlQuery } from 'querystring'
import { remark } from 'remark'
import html from 'remark-html'

export type AllDocs = { id: string; fullPath: string }
const defaultDir = 'generated'

function getFileNames(directory = defaultDir) {
  const docsDirectory = path.join(process.cwd(), directory)
  const fileNames = fs.readdirSync(docsDirectory)
  const files: AllDocs[] = []
  fileNames.forEach((filename) => {
    if (path.extname(filename) == '.md') {
      const id = filename.replace(/\.md$/, '')
      const fullPath = path.join(docsDirectory, filename)

      files.push({ id, fullPath })
    }
  })
  return files
}

export function getDocs(directory = defaultDir) {
  return getFileNames(directory)
}

export interface IParams extends ParsedUrlQuery {
  id: string
}
export function getDocIds(directory = defaultDir) {
  const fileNames = getFileNames(directory)
  return fileNames.map((file) => {
    const { id } = file
    return {
      params: {
        id
      }
    }
  })
}

export interface IDocData {
  id: string
  contentHtml: string
}
export async function getDocData(id: string, directory = defaultDir) {
  const fullPath = path.join(process.cwd(), directory, `${id}.md`)
  const content = fs.readFileSync(fullPath, 'utf-8')
  const processedContent = await remark()
    .use(html)
    .process(content)
  console.log(processedContent.value)
  const contentHtml = processedContent.value.toString()
  return {
    id,
    contentHtml
  }
}
// const fileContents = fs.readFileSync(fullPath,'utf-8')
