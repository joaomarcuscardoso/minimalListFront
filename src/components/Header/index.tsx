import { useState} from "react"
import { ImSearch } from "react-icons/im"
import { Link, useNavigate } from "react-router-dom"

export function Header() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  function handleSearch(event: React.FormEvent) {
    event.preventDefault()
    console.log("entrou")
  }

  function handleLogout() {
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <div className="navbar mr-auto">
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
            <li className="nav-item dropdown ml-10">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Conta 
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/login">Login</Link></li>
                <li><Link className="dropdown-item" to="/profile">Perfil</Link></li>
                <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                <li><Link className="dropdown-item" to="/register">Resgistrar</Link></li>
              </ul>
            </li>

          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li>
              <form className="d-flex" id="searchForm" onSubmit={e => handleSearch(e)}>
                <div className="input-group">
                  <input className="form-control form-control-sm me-2 inputSearch" type="text" placeholder="Busque..." aria-label="Busque..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  <button type="submit" className="btn btn-outline-white" id="searchBtn">
                    <ImSearch id="searchIcon" />
                  </button>
                </div>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
} 
