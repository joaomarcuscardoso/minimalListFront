import { IContent } from "types"

type Props = {
  key: number
  children: React.ReactNode
}
export function ContainerCard({key, children} : Props) {
  return (
    <div className="cards" key={key}>
      <div id="container-cards">
        {children}
      </div>
    </div>
  )
}
