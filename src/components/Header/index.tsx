import { useState } from "react"
import { useCookies } from "react-cookie"
import { ImSearch } from "react-icons/im"
import { Link, useNavigate } from "react-router-dom"
import { IUser } from "types"

export function Header() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies()
  let user: IUser = cookies?.user as IUser

  function handleSearch(event: React.FormEvent) {
    event.preventDefault()
    console.log("entrou")
  }

  function handleLogout() {
    setCookie("user", null, { path: "/" })
    user = cookies?.user as IUser
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="navbar">
        <Link className="navbar-brand" to="/">MinimalList</Link>
      </div>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/review" className="nav-link">Review</Link>
          </li>
          {user?.id ? (
            <>
              <li className="nav-item"><a className="nav-link" id="link" onClick={handleLogout}>Logout</a></li>
              <li className="nav-item"><Link className="nav-link" to="/profile">Perfil</Link></li>
              <li className="nav-item">
                <Link to="/library" className="nav-link">Sua Biblioteca</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Resgistrar</Link></li>

            </>
          )}
        </ul>
      </div>
    </nav>
  )
} 
