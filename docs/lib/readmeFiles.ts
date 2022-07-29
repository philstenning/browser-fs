import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'


async function  getMarkdownFile(fileWithPath:string){
    const relativePath = path.join(__dirname, fileWithPath)
    console.log(relativePath)
    const markdownFile = fs.readFileSync(relativePath,'utf-8')

  const processedContent = await remark()
    .use(html)
    .process(markdownFile)
  const contentHtml = processedContent.value.toString()
  return {
    contentHtml
  }

}

export {getMarkdownFile}