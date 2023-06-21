import { Form } from "components/Form"
import { useCookies } from "react-cookie"
import { ICategory, IContent, IUser } from "types"
import { ImSearch } from "react-icons/im"
import { useEffect, useState } from "react"
import { ContainerCard } from "components/ContainerCard"
import { Card } from "components/Card"
import axios from "axios"
import { API_URL } from "types/apiURL"
import { Link, useNavigate, useParams } from "react-router-dom"

export function ContentScreen() {
  const { id } = useParams()
  const [content, setContent] = useState<IContent>()
  const navegate = useNavigate()

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

  return (
    content && (
      <div className="container-fluid" id="content-main">
        <div className="row">
          <div className="col-12">
            <div className="content-container">
              <img src={content.image} alt="Background" className="img-fluid" />
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
              </div>


            </div>
          </div>
        </div>
      </div>
    )
  )
}
