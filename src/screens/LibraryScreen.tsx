import { ReactNode, useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "types/apiURL"
import { Link, useNavigate, useParams } from "react-router-dom"
import { IContent, ILibrary, IReview, IUser } from "types"
import { Form } from "components/Form"
import { useCookies } from "react-cookie"
import { AiFillDelete } from "react-icons/ai"
import { Button } from "components/Button"
import { Card } from "components/Card"

export function LibraryScreen() {
  const navegate = useNavigate()
  const [profile, setProfile] = useState<IUser>()
  const [cookies] = useCookies()
  const user: IUser = cookies?.user as IUser

  useEffect(() => {
    if (user?.id === undefined) navegate(0)

    axios.get<IUser>(`${API_URL}/api/user/profile/${user.id}`)
      .then((response) => {
        setProfile(response.data)
        return response.data
      })
      .catch((error) => console.error(error))
  }, [user])

  const handleRemoveLibrary = (e: any, id: number) => {
    axios.delete<IReview>(`${API_URL}/api/library/${id}`)
      .then((response) => {
        alert("Library deletada com sucesso!")
        navegate(0)
        return response.data
      })
      .catch((err) => {
        console.error(err)
        alert("Falha na operação")
      })
  }

  return (
    <div className="container-fluid">
      <div className="row library-principa">
        <div className="col-12" id="content-main">
          <h1 className="title-h3"> Veja os conteúdos salvos!</h1>

          {
            profile?.libraries && profile.libraries.length > 0 ? (
              profile.libraries.map((library: ILibrary) => (
                <div className="row card-main" key={library.id}>

                  <Card
                    image={library.content.image}
                    key={library.content.id}
                  >
                    <div className="container-library-info">
                      <h4 className="card-title">
                        {library.content.name}
                        <span className="card-text">
                          Você parou no {library.episode} epísodio da season {library.seasonContent} de {library.content?.title}
                        </span>

                      </h4>
                    </div>
                    <p className="card-text">{library.content?.description}</p>
                    <div className="row">
                      <div className="col-6">

                        <Link to={`/content/${library.content.id}`} className="form-control btn btn-primary">
                          Ver mais
                        </Link>
                      </div>
                      <div className="col-6">
                        <Button type="button" classBtn="btn btn-danger library-icon" onClick={(e) => handleRemoveLibrary(e, library.id)}>
                          Deletar Item
                        </Button>
                      </div>

                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <div className="d-flex flex-row">
                <h3 className="subtitle-lb"><strong>Não há conteúdo a ser exibido:</strong></h3>
                <Link to="/" className="nav-link">Voltar à Home</Link>
              </div>
            )
          }
        </div>
      </div>
    </div >
  )
}
