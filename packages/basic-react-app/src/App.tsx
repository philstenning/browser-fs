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
            <VerticalGrid>
              <div>
                <div>
                  <h3>Top Heading</h3>
                  <p>

                  ipsum dolor sit amet,
                  consectetur adipisicing elit. Quam at eveniet provident eos
                  voluptatibus nemo voluptates et error? Laborum at quibusdam
                  expedita sint iste, nobis nulla debitis enim, magnam molestias
                  quod a incidunt ipsum obcaecati ad, error architecto earum rem
                  sit vero quis voluptatem! Possimus fugiat earum officia
                  pariatur numquam accusamus itaque soluta magni hic veritatis
                  ea facere id ullam, corporis sequi saepe quia quasi incidunt
                  adipisci temporibus culpa dolores nesciunt animi iste. Aliquid
                  nobis nostrum corporis ex amet iure porro sit asperiores
                  dolor. Facere sint rerum qui quod sunt, earum commodi
                  similique perspiciatis, porro cupiditate in dolore. Nostrum,
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  quis similique qui praesentium excepturi doloribus atque
                  reprehenderit autem ullam, minus, veniam quisquam alias ad
                  odio fugit suscipit at modi ex eius. Aperiam dignissimos, illo
                  ullam saepe ex voluptates et eos temporibus placeat? Suscipit
                  eos, mollitia consequuntur in pariatur sunt. Tenetur
                  consequuntur exercitationem, nemo deserunt consequatur quis
                  repellat? Optio similique possimus dicta animi eum nobis
                  magnam quos repudiandae, ullam nam odio assumenda, ipsa
                  repellendus, doloribus maiores ab eligendi a sapiente. Ducimus
                  delectus accusamus, sapiente suscipit explicabo voluptate
                  eserunt quae voluptas laudantium delectus laborum repellat
                  aliquam iure eligendi atque cupiditate saepe? Velit quibusdam
                  eaque maxime inventore enim vero sed deleniti laboriosam
                  blanditiis dignissimos molestiae, cupiditate consequatur
                  praesentium et odio dolore obcaecati rerum illum quod, qui
                  dolores consequuntur animi eveniet ratione! Dolorum modi
                  voluptate, qui magni aut, facilis excepturi porro sequi
                  nesciunt ipsum aliquid, accusantium quia aspernatur!
                  Asperiores veritatis porro nobis nostrum error quae facere
                  commodi cupiditate numquam, assumenda laudantium omnis iusto.
                  Itaque voluptas, fugit sapiente non odit esse repellat nisi
                  corrupti debitis qui quaerat, at quae sequi eaque modi. Fuga
                  maxime excepturi rem unde magnam sapiente quam nostrum a modi
                  illo, natus quisquam harum architecto dicta voluptatibus quasi
                  at dolores vel! Aspernatur ea excepturi deleniti dignissimos
                  veritatis accusamus ipsam, saepe beatae corporis sint at.
                  Consequuntur ducimus, assumenda possimus eos totam alias nemo
                  porro reiciendis? Odio dolor dolores id repudiandae
                  necessitatibus! Laboriosam unde omnis explicabo, at,
                  praesentium nulla ipsa, exercitationem quidem autem dolorum
                  libero sed placeat commodi! Voluptas doloribus iure molestias,
                  est quae harum alias illo incidunt, eos odit, quos molestiae
                  veniam aspernatur asperiores quia tempore eius in facere.
                  Itaque voluptates numquam ullam neque natus officia quisquam
                  eveniet aliquam illo, enim, in reprehenderit. Consequuntur
                  iste vel inventore! Officia aut maiores, vel mollitia soluta
                  dolorum odit placeat similique. a!
                  </p>
                </div>
              </div>
              <div>
                <h3>Content bottom</h3>
                <p>

                fugit neque cupiditate repellendus inventore saepe maiores
                ratione aliquid nulla? In alias facilis, itaque iste aliquid
                aliquam quidem accusamus dolor a fugit quae tempore obcaecati
                ipsa, autem ex. Excepturi id repellat voluptate illo animi
                laboriosam ipsam fugiat voluptatibus voluptatum vel deleniti
                quae, possimus, tempore pariatur maiores quo tenetur at
                delectus, omnis aperiam eligendi facere? Officia cumque,
                inventore cupiditate consequuntur commodi laborum consectetur.
                Quidem sunt voluptatum mollitia nemo vel perferendis eligendi a
                deleniti veniam impedit quod laborum, consequatur nihil quas in
                exercitationem? Similique cum, minus distinctio libero iusto
                nisi impedit, veniam et voluptates voluptatum nihil, voluptate
                illum enim non voluptatem voluptatibus soluta dolores alias
                excepturi. Sit nulla commodi accusantium vitae laudantium id
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
