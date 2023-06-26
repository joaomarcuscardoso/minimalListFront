import { useCookies } from "react-cookie"
import { IUser } from "types"
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
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
