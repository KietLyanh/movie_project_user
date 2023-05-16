import { Header } from 'src/common/Header'

export const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <div className="">{children}</div>
    </div>
  )
}
