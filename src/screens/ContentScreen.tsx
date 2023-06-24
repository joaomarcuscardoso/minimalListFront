import { ReactNode, useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "types/apiURL"
import { useNavigate, useParams } from "react-router-dom"
import { IContent } from "types"
import { Form } from "components/Form"
import { argv0 } from "process"

export function ContentScreen() {
  const { id } = useParams()
  const navegate = useNavigate()

  const [content, setContent] = useState<IContent>()
  const [availableEpisode, setAvailableEpisode] = useState<number[]>([])
  const [selectedSeason, setSelectedSeason] = useState<number | undefined>()
  const [selectedEpisode, setSelectedEpisode] = useState<number | undefined>()

  useEffect(() => {
    if (id == undefined) navegate("/")

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
    if (selectedSeason == undefined) return
    if (content == undefined) return

    if (content.contentSeason.length < selectedSeason - 1) return

    const epAvailable = content.contentSeason[selectedSeason - 1].episode
    const available: number[] = []

    for (let i = 1; i <= epAvailable; i++) {
      available.push(i)
    }
    setAvailableEpisode(available)


    console.log(availableEpisode)

  }, [selectedSeason])

  return (
    content && (
      <div className="container-fluid" id="content-main">
        <div className="row">
          <div className="col-12">
            <div className="content-container">
              <img src={content.image} alt="Background" className="img-fluid" id="img-content" />
              <div className="content-info">
                <div className="content-container-mains">
                  <div className="content-info-header">
                    <h1>{content.name} - {content.season} Temporada(s)</h1>
                  </div>

                </div>
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
                  <p>
                    {content.description}
                  </p>
                </div>
                <div className="button-container">
                  <div className="selects-container">
                    <Form>
                      <div className="col-3 d-inline-flex">
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
                      <button type="submit" className="btn btn-secondary">Adicionar a lista</button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="content-info-review">
              <Form>
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="container-buttons">
                        <div className="col-9">
                          <label className="form-label">Titulo</label>
                          <input type="text" name="title" className="form-control" placeholder="Título da review" />
                        </div>
                        <div className="col-1"></div>
                        <div className="col-2">
                          <label className="form-label">Nota</label>
                          <input type="number" name="rate" className="form-control" placeholder="0.0 á 5 notas" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="container-info">
                          <label className="form-label">Mensagem</label>
                          <div className="container-spollier">
                            <label className="form-label">Spollier</label>
                            <input type="checkbox" className="form-check-input" name="spollier" />
                          </div>
                        </div>
                        <textarea className="form-control" placeholder="Escreva sua review aqui" />
                      </div>
                    </div>
                    <div className="row">
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-12">
                        <button type="submit" className="form-control btn btn-secondary">Adicionar a review</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
