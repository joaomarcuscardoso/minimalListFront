import { Form } from "components/Form"
import { useCookies } from "react-cookie"
import { IContent, IUser } from "types"
import { ImSearch } from "react-icons/im"
import { useEffect, useState } from "react"
import { ContainerCard } from "components/ContainerCard"
import { Card } from "components/Card"
import axios from "axios"
import { API_URL } from "types/apiURL"

export function HomeScreen() {
  const [cookies, setCookie] = useCookies()
  const [search, setSearch] = useState("")
  const [cards, setCards] = useState<IContent[][]>([])
  const user: IUser = cookies?.user as IUser
  const countCards = 0

  useEffect(() => {
    axios.get<IContent[]>(`${API_URL}/api/content`)
      .then((response) => {
        const chunkSize = 3
        const slicedData: IContent[][] = []

        for (let i = 0; i < response.data.length; i += chunkSize) {
          slicedData.push(response.data.slice(i, i + chunkSize))
        }

        setCards(slicedData)
        return response.data
      })
      .catch((error) => console.error(error))
  }, [])

  console.log(cards)
  return (
    <div className="container-fluid" id="content-main">
      <div className="row">
        <div className="col-12">
          <div className="image-main">
            <img src={"https://wallpaperset.com/w/full/e/0/c/315162.jpg"} alt="Background" className="img-fluid brandImage" />
          </div>
        </div>
      </div>
      <div className="row" id="container-select">
        <div className="col-4">
          <div className="select-container">
            <Form>
              <select className="form-select" aria-label="Categoria">
                <option selected>Selecione uma categoria</option>
                <option value="1">Ação</option>
              </select>
            </Form>
          </div>
        </div>
        <div className="col-4">
          <Form>
            <select className="form-select" aria-label="Categoria">
              <option selected>Selecione uma categoria</option>
              <option value="1">Ação</option>
            </select>
          </Form>
        </div>
        <div className="col-4">
          <Form>
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Busque..." aria-label="Busque..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <button type="submit" className="btn btn-outline-white" id="searchBtn">
                <ImSearch id="searchIcon" />
              </button>
            </div>
          </Form>
        </div>
      </div>
      <div className="row card-main">
        {cards.map((chuck: IContent[], index) => (
          <ContainerCard key={index}>
            {chuck.map((content: IContent) => (
              content ? (
                <Card
                  image={content.image}
                  key={content.id}
                >
                  <h5 className="card-title">{content?.title}</h5>
                  <p className="card-text">{content?.description}</p>
                  <a href="#" className="btn btn-primary">
                    Ver mais
                  </a>
                </Card>
              ) : null
            ))}
          </ContainerCard>
        ))}
      </div>
    </div>
  )
}
