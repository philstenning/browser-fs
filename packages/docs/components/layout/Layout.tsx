import Header from './header'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default Layout
