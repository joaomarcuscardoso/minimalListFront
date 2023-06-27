import { useCookies } from "react-cookie"
import { ReactNode, useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "types/apiURL"
import { IUser } from "types"
import { Form } from "components/Form"
export function ProfileScreen() {
  const [cookies, setCookie] = useCookies()
  let user: IUser = cookies?.user as IUser
  const [img, setImg] = useState<string>(user.imagePathComplete)

  const handleForm = (e: any) => {
    const formData = new FormData()
    formData.append("image", e.target.files[0])

    axios.put<IUser>(`${API_URL}/api/user/profile/image/${user.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then((response) => {
        if (response?.data?.imagePathComplete) {
          setImg(response.data.imagePathComplete)
          user = response.data
          setCookie("user", user, { path: "/" })
        }
    })
    .catch((error) => console.error(error))
  }
  return (
    <div className="container-fluid">
      <div className="row-center" id="content-main">
        <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
          <div className="profile-container">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-xs-1 col-sm-1 text-center">
                  <figure>
                    <img src={img} alt={user.nickname} className="img-circle img-fluid" />
                  </figure>
                </div>
                <div className="col-xs-12 col-sm-8">
                  <h3><p><strong>Nickname: </strong>{cookies?.user && user.nickname}</p></h3>
                  <p><strong>Email: </strong>{cookies?.user && user.email}</p>
                  <p><strong>Quantidade de reviews:</strong>{user.reviews?.length ?? 0}</p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 divider text-center">
              <div className="button-container">
                <div className="selects-container">
                  <Form>
                    <input type="file" name="image" onChange={handleForm} />
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
