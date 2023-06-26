import { useCookies } from "react-cookie"
import { IUser } from "types"
export function ProfileScreen() {
  const [cookies, setCookie] = useCookies()
  const user : IUser = cookies?.user as IUser
  return(
    <div className="container-fluid">
      <div className="row">
      <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
        <div className="profile-container">
          <div className="col-sm-12">
            <div className="col-xs-12 col-sm-8">
            <h1>ProfileScreen</h1>
            {cookies?.user && <h3>{user.nickname}</h3>}
            <p><strong>Quantidade de reviews:</strong>{user.reviews?.length}</p>
            </div>
            <div>
              <figure>
                <img src={user.image} alt="" className="img-fluid roundend img-profile"/>
              </figure>
            </div>
          </div>
          <div className="col-xs-12 divider text-center">
            <div className="col-xs-12 col-sm-4 emphasis">
              <button type="button" className="form-control btn btn-info btn-block">Editar perfil</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
