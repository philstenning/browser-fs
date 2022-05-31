import { FsaDbContextProvider } from 'react-fsa-database'
import { useState } from 'react'
// import RootDirectories from './components/rootDirectories'
// import Directories from './components/directories'

// import Collections from './components/collections'
// import LeftSidebar from './components/layout/leftSidebar'
// import RightSidebar from './components/layout/rightSidebar'
// import Display from './components/display'

// import DragBar from './components/layout/dragBar'
import './app.css'
import Grid from './components/layout/grid'
import VerticalGrid from './components/layout/resizableVerticalGrid'
// import Layout from './components/layout/layout'
function App() {
  const [leftPanelIsCollapsed, setLeftPanelIsCollapsed] = useState(false)
  const [rightPanelIsCollapsed, setRightPanelIsCollapsed] = useState(false)
  const [topPanelIsCollapsed, setTopPanelIsCollapsed] = useState(false)
  const [bottomPanelIsCollapsed, setBottomPanelIsCollapsed] = useState(false)
  return (
    <div className="app">
      <FsaDbContextProvider
        fileExtensionsForApp={['gcode', '.3mf', 'jpg', 'stl']}
      >
        {/* <Layout>
         <LeftSidebar/>
         <DragBar/>
         <Display/>
         <RightSidebar/>
       </Layout> */}
        <div className="spacer">
          <div className="btn-group">
            <button
              onClick={() => setLeftPanelIsCollapsed((current) => !current)}
            >
              collapse Left{' '}
            </button>
            <button
              onClick={() => setRightPanelIsCollapsed((current) => !current)}
            >
              collapse Right{' '}
            </button>
            <button
              onClick={() => setTopPanelIsCollapsed((current) => !current)}
            >
              Collapse Top
            </button>
            <button
              onClick={() => setBottomPanelIsCollapsed((current) => !current)}
            >
              Collapse bottom {bottomPanelIsCollapsed.toString()}
            </button>
          </div>
          <Grid
            collapseRight={rightPanelIsCollapsed}
            collapseLeft={leftPanelIsCollapsed}
          >
            <div style={{ overflow: 'hidden' }}>
              {' '}
              Lorem {leftPanelIsCollapsed.toString()}{' '}
              {rightPanelIsCollapsed.toString()} ipsum dolor sit amet,
              consectetur adipisicing elit. Quam at eveniet provident eos
              voluptatibus nemo voluptates et error? Laborum at quibusdam
              expedita sint iste, nobis nulla debitis enim, magnam molestias
              quod a incidunt ipsum obcaecati ad, error architecto earum rem sit
              vero quis voluptatem! Possimus fugiat earum officia pariatur
              numquam accusamus itaque soluta magni hic veritatis ea facere id
              ullam, corporis sequi saepe quia quasi incidunt adipisci
              temporibus culpa dolores nesciunt animi iste. Aliquid nobis
              nostrum corporis ex amet iure porro sit asperiores dolor. Facere
              sint rerum qui quod sunt, earum commodi similique perspiciatis,
              porro cupiditate in dolore. Nostrum, a!
            </div>
            {/* <Cards /> */}
            <VerticalGrid
              collapseTop={topPanelIsCollapsed}
              collapseBottom={bottomPanelIsCollapsed}
            >
              <Cards />
              <div>
                <h3>Content bottom</h3>
                <h4>{topPanelIsCollapsed.toString()}</h4>
                <h4>{bottomPanelIsCollapsed.toString()}</h4>
                <p>
                  <button onClick={() => console.log('you clicke me')}>
                    click me
                  </button>
                  fugit neque cupiditate repellendus inventore saepe maiores
                  ratione aliquid nulla? In alias facilis, itaque iste aliquid
                  aliquam quidem accusamus dolor a fugit quae tempore obcaecati
                  ipsa, autem ex. Excepturi id repellat voluptate illo animi
                  laboriosam ipsam fugiat voluptatibus voluptatum vel deleniti
                  quae, possimus, tempore pariatur maiores quo tenetur at
                  delectus, omnis aperiam eligendi facere? Officia cumque,
                  inventore cupiditate consequuntur commodi laborum consectetur.
                  Quidem sunt voluptatum mollitia nemo vel perferendis eligendi
                  a deleniti veniam impedit quod laborum, consequatur nihil quas
                  in exercitationem? Similique cum, minus distinctio libero
                  iusto nisi impedit, veniam et voluptates voluptatum nihil,
                  voluptate illum enim non voluptatem voluptatibus soluta
                  dolores alias excepturi. Sit nulla commodi accusantium vitae
                  laudantium id
                </p>
              </div>
            </VerticalGrid>
            <div style={{ height: '100%', overflow: 'auto' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem quo nihil dignissimos numquam voluptates ratione s
              deserunt, similique aperiam? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Exercitationem quo nihil dignissimos
              numquam voluptates ratione s deserunt, similique aperiam? Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
              quo nihil dignissimos numquam voluptates ratione s deserunt,
              similique aperiam? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Exercitationem quo nihil dignissimos numquam
              voluptates ratione s deserunt, similique aperiam? Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Exercitationem quo
              nihil dignissimos numquam voluptates ratione s deserunt, similique
              aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem quo nihil dignissimos numquam voluptates ratione s
              deserunt, similique aperiam? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Exercitationem quo nihil dignissimos
              numquam voluptates ratione s deserunt, similique aperiam?
              Exercitationem quo nihil dignissimos numquam voluptates ratione s
              deserunt, similique aperiam? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Exercitationem quo nihil dignissimos
              numquam voluptates ratione s deserunt, similique aperiam?
              Exercitationem quo nihil dignissimos numquam voluptates ratione s
              deserunt, similique aperiam? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Exercitationem quo nihil dignissimos
              numquam voluptates ratione s deserunt, similique aperiam?
              Exercitationem quo nihil dignissimos numquam voluptates ratione s
              deserunt, similique aperiam? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Exercitationem quo nihil dignissimos
              numquam voluptates ratione s deserunt, similique aperiam?
            </div>
          </Grid>
        </div>
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
