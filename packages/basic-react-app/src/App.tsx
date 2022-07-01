import { FsaDbContextProvider } from 'react-fsa-database'
import { useState } from 'react'

import './app.css'

import {
  ResizableHorizontalGrid,
  ResizableVerticalGrid,
} from 'react-resizable-collapsible-grid'
import 'react-resizable-collapsible-grid/dist/index.css'

function App() {
  return (
    <div className="app">
      <FsaDbContextProvider
        fileExtensionsForApp={['gcode', '.3mf', 'jpg', 'stl']}
      >
        <ResizableHorizontalGrid>
          <div>one</div>
         <Cards/>
         <Cards/>
          
        </ResizableHorizontalGrid>
      </FsaDbContextProvider>
    </div>
  )
}

export default App

const Cards = () => {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div className="card-wrapper">
      <div className="cards">
        {cards.map((card) => (
          <div key={card} className="card">
            {card}
          </div>
        ))}
      </div>
    </div>
  )
}
