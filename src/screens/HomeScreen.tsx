import { Form } from "components/Form"
import { useCookies } from "react-cookie"
import { ICategory, IContent, IUser } from "types"
import { ImSearch } from "react-icons/im"
import { useEffect, useState } from "react"
import { ContainerCard } from "components/ContainerCard"
import { Card } from "components/Card"
import axios from "axios"
import { API_URL } from "types/apiURL"
import { Link } from "react-router-dom"

export function HomeScreen() {
  const [cookies, setCookie] = useCookies()
  const [search, setSearch] = useState("")
  const [cards, setCards] = useState<IContent[][]>([])
  const [seasons, setSeasons] = useState<number[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
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

    axios.get<number[]>(`${API_URL}/api/content/getSeason`)
      .then((response) => {
        setSeasons(response.data)
        return response.data
      })
      .catch((error) => console.error(error))
    
    axios.get<ICategory[]>(`${API_URL}/api/category`)
      .then((response) => {
        setCategories(response.data)
        return response.data
      })
      .catch((error) => console.error(error))
  }, [])

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
              <select className="form-select" aria-label="Season">
                <option selected>Selecione uma season</option>
                {seasons.map((season: number, key) => (
                  <option key={key} value={season}>{season}</option>
                ))}
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
                  <Link to={`/content/${content.id}`} className="btn btn-primary">
                    Ver mais
                  </Link>
                </Card>
              ) : null
            ))}
          </ContainerCard>
        ))}
      </div>
    </div>
  )
}
