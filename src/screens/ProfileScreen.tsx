import { useCookies } from "react-cookie"
import { ReactNode, useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "types/apiURL"
import { IUser } from "types"
import { Form } from "components/Form"
export function ProfileScreen() {
  const [cookies, setCookie] = useCookies()
  const user : IUser = cookies?.user as IUser
  const handleForm = () => {
    
  }
  return(
    <div className="container-fluid">
      <div className="row-center" id="content-main">
      <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
        <div className="profile-container">
          <div className="col-sm-12">
            <div className="col-xs-12 col-sm-8">
            <h3><p><strong>Nickname: </strong>{cookies?.user && user.nickname}</p></h3>
            <p><strong>Quantidade de reviews:</strong>{user.reviews?.length}</p>
            </div>
            <div className="col-xs-12 col-sm-4 text-center">
              <figure>
                <img src={user.image} className="img-circle img-responsive"/>
              </figure>
            </div>
          </div>
          <div className="col-xs-12 divider text-center">
            <div className="col-xs-12 col-sm-4 emphasis">
              <button type="button" onClick={handleForm} className="form-control btn btn-info btn-block">Editar perfil</button>
            </div>
            <div className="button-container">
              <div className="selects-container">
              <Form>
                <div className="row">
                  <div className="col-4 col-sm-8 d-inline-flex"></div>
                </div>
              </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
