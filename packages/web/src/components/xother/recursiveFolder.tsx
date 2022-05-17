import React from 'react'
import { VirtualFileSystemEntry } from 'fsa-browser'
//@ts-ignore
import style from './recursive-folder.module.css'
interface Props {
  folder: VirtualFileSystemEntry
}
export function RecursiveFolder({ folder }: Props) {
  return (
    <li key={folder.id} className={style.list} data-testid="recursiveFolder">
      Folder: {folder.name}
      <ul className={style.none}>
        {folder.entries?.map((entry) => {
          if (entry.kind === 'file') {
            return (
              <li key={entry.id} className="bfl__file">
                <span className={style.file}>
                  file: {entry.name}
                  {/* <pre>{entry.path}</pre>{" "} */}
                </span>
              </li>
            )
          } else {
            return <RecursiveFolder key={entry.id} folder={entry} />
          }
        })}
      </ul>
    </li>
  )
}

type VListProps = {
  virtualEntry: VirtualFileSystemEntry
}
export function RecursiveUnorderedList({ virtualEntry }: VListProps) {
  return (
    <ul className={style.list} data-testid="recursiveUnorderedList">
      <RecursiveFolder folder={virtualEntry} />
    </ul>
  )
}
