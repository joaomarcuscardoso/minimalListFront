import { ReactNode, useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "types/apiURL"
import { useNavigate, useParams } from "react-router-dom"
import { IContent, ILibrary, IReview, IUser } from "types"
import { Form } from "components/Form"
import { useCookies } from "react-cookie"
import { AiFillDelete } from "react-icons/ai"
import { Button } from "components/Button"

export function ContentScreen() {
  const { id } = useParams()
  const navegate = useNavigate()
  const [cookies] = useCookies()
  const user: IUser = cookies?.user as IUser

  const [content, setContent] = useState<IContent>()
  const [availableEpisode, setAvailableEpisode] = useState<number[]>([])
  const [selectedSeason, setSelectedSeason] = useState<number | undefined>()
  const [selectedEpisode, setSelectedEpisode] = useState<number | undefined>()
  const [error, setError] = useState<string>()
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [rate, setRate] = useState(0)
  const [spollier, setSpollier] = useState(false)

  useEffect(() => {
    if (id === undefined) navegate(0)

    axios.get<IContent>(`${API_URL}/api/content/find/${Number(id)}`)
      .then((response) => {
        if (response.data) {
          setContent(response.data)
          return response.data
        }
      })
      .catch((error) => console.error(error))
  }, [id])

  useEffect(() => {
    if (selectedSeason === undefined) return
    if (content === undefined) return

    if (content.contentSeason.length < selectedSeason - 1) return

    const epAvailable = content.contentSeason[selectedSeason - 1].episode
    const available: number[] = []

    for (let i = 1; i <= epAvailable; i++) {
      available.push(i)
    }

    setAvailableEpisode(available)
  }, [selectedSeason])

  const handleForm = () => {
    if (content?.id == null) return
    if (user?.id == null) {
      setError("Você precisa estar logado para avaliar")
      return
    }

    if (rate < 0 || rate > 5) {
      setError("Avalie de 0 a 5")
      return
    }

    axios.post<IReview>(`${API_URL}/api/review`, {
      idContent: content.id,
      idUser: user.id,
      title: title,
      text: message,
      rate: rate,
      spollier: spollier,
    })
      .then((response) => {
        alert("Review enviada com sucesso!")

        clear()
        navegate(0)
        return response.data
      })
      .catch((error) => {
        alert("Erro ao enviar review")
        clear()
        navegate(0)
        console.error(error)
      })
  }

  const clear = () => {
    setTitle("")
    setMessage("")
    setRate(0)
    setSpollier(false)
  }

  const handleAddLibrary = () => {
    if (!selectedEpisode || !selectedSeason) return
    if (!user?.id) return
    if (!content?.id) return

    axios.post<ILibrary>(`${API_URL}/api/library`, {
      idUser: user.id,
      idContent: content.id,
      episode: String(selectedEpisode),
      seasonContent: String(selectedSeason),
    })
      .then((response) => {
        alert("Adicionando conteúdo a sua biblioteca!")
        clear()
        navegate(0)
        return response.data
      })
      .catch((error) => {
        alert("Erro ao salvar conteúdo a biblioteca")
        clear()
        navegate(0)
        console.error(error)
      })
  }

  const handleRemoveReview = (e: any, idReview: number) => {
    axios.delete<IReview>(`${API_URL}/api/review/${idReview}`)
      .then((response) => {
        alert("Review deletada com sucesso!")
        navegate(0)
        return response.data
      })
      .catch((err) => {
        console.error(err)
        alert("Falha na operação")
      })
  }

  return (
    content && (
      <div className="container-fluid" id="container-content">
        <div id="content-main">
          <div className="row">
            <div className="col-12">
              <div className="content-container">
                <img src={content.image} alt="Background" className="img-fluid" id="img-content" />
                <div className="content-info">
                  <h1>{content.name} - {content.season} Temporada(s)</h1>

                  <div className="content-info-main">
                    <p><strong>{content?.categoryName}</strong></p>
                    <p><strong>-</strong></p>
                    {
                      content?.date ? (
                        <p><strong>Lançamento em {content?.date.toString()}</strong></p>
                      ) : (
                        <p><strong>Não há data de lançamento</strong></p>
                      )
                    }
                    <p><strong>-</strong></p>
                    <p><strong>Ainda está sendo producido? {content.produce == true ? "Sim!" : "Não"}</strong></p>
                  </div>
                  <div id="content-info-desc">
                    <strong>Descrição</strong>
                    <br/>
                    <p>
                      {content.description}
                    </p>
                  </div>
                  <div className="button-container">
                    <div className="selects-container">
                      <Form>
                        <div className="row">
                          <div className="col-4 col-sm-8 d-inline-flex">
                            <select className="select-season form-select" onChange={(e) => setSelectedSeason(Number(e.target.value))}>
                              <option value="" placeholder="Sem Temporada"></option>
                              {content.contentSeason?.map((item, index) => (
                                <option value={index + 1} key={index}>{index + 1} Temporada(s)</option>
                              ))}
                            </select>

                            {availableEpisode.length > 0 && (
                              <select className="select-ep form-select" onChange={(e) => setSelectedEpisode(Number(e.target.value))}>
                                <option value="" placeholder="Sem Episódio"></option>
                                {availableEpisode.map((item, index) => (
                                  <option value={item} key={index}>{item} Episódio(s)</option>
                                ))}
                              </select>
                            )}
                          </div>
                          <div className="col-4 col-sm-4">
                            <button type="button" onClick={handleAddLibrary} className="btn btn-primary">Adicionar a lista</button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="content-info-review">
                <Form
                  error={error}
                >
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="container-buttons">
                          <div className="col-9">
                            <label className="form-label">Titulo</label>
                            <input type="text" name="title" className="form-control" placeholder="Título da review" onChange={(e) => setTitle(String(e.target.value))} />
                          </div>
                          <div className="col-1"></div>
                          <div className="col-2">
                            <label className="form-label">Nota</label>
                            <input type="number" name="rate" className="form-control" placeholder="0.0 á 5 notas" min={0} max={5} onChange={(e) => setRate(Number(e.target.value))} />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="container-info">
                            <label className="form-label">Mensagem</label>
                            <div className="container-spollier">
                              <label className="form-label">Spollier</label>
                              <input type="checkbox" className="form-check-input" name="spollier" onChange={(e) => setSpollier(Boolean(e))} />
                            </div>
                          </div>
                          <textarea className="form-control" placeholder="Escreva sua review aqui" onChange={(e) => setMessage(String(e.target.value))} />
                        </div>
                      </div>
                      <div className="row">
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-12">
                          <button type="button" onClick={handleForm} className="form-control btn btn-primary">Adicionar a review</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          {content.reviews?.map((item, index) => (
            <>
              <div className="row" key={index}>
                <div className="d-inline-flex review-container-div">
                  <div className="img-review ">
                    <img src={item.imageProfile} className="img-fluid roundend img-review" />
                  </div>
                  <div className="col-10">

                    <div className="review-container-info">
                      <div className="row">
                        <a href="" role="button" className={`${item.spollier ? "spollier" : ""}`}>
                          <div className="col-11">
                            <h3>{item.title} - <span>({item.rate})</span></h3>
                            <p>{item.text}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-1">
                    <Button type="button" classBtn="btn btn-danger icon-container" onClick={(e) => handleRemoveReview(e, item.id)}>
                      <AiFillDelete />
                    </Button>
                  </div>
                </div>
              </div>
              <br />
            </>
          ))}
        </div>
      </div>
    )
  )
}
