import { useCookies } from "react-cookie"
import { IUser } from "types"

export function HomeScreen() {
  const [cookies, setCookie] = useCookies()
  const user : IUser = cookies?.user as IUser
  console.log(cookies)

  return (
    <div className="container-fluid">
      <h1>HomePage</h1>
      {cookies?.user && <h3>{user.nickname}</h3>}
    </div>
  )
}
