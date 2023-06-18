import { useCookies } from "react-cookie"
import { IUser } from "types"

export function ReviewScreen() {
  const [cookies, setCookie] = useCookies()
  const user : IUser = cookies?.user as IUser
  return(
    <div className="container-fluid">
      <h1>ReviewScreen</h1>
      {cookies?.user && <h3>{user.nickname}</h3>}
    </div>
  )
}
