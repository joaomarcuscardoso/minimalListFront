import { IContent } from "types"

type Props = {
  key: number
  image: string
  children: React.ReactNode
}

export function Card({key, children, image} : Props) {
  return (

    <div className="col-md-4 col-sm-2" key={key}>
      <div className="card-container">
        <div className="card">
          <img src={image} alt="Background" className="img-fluid image-card" />
          <div className="card-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
