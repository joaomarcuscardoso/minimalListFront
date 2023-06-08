import { useState} from "react"
import { ImSearch } from "react-icons/im"

export function Header() {
  const [search, setSearch] = useState("")

  function handleSearch(event: React.FormEvent) {
    event.preventDefault()
    console.log("entrou")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <div className="navbar mr-auto">
          <a className="navbar-brand" href="#">MinimalList</a>
        </div>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" id="searchForm" onSubmit={e => handleSearch(e)}>
            <div className="input-group">
              <input className="form-control form-control-sm me-2 inputSearch" type="text" placeholder="Busque..." aria-label="Busque..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <button type="submit" className="btn btn-outline-white" id="searchBtn">
                <ImSearch id="searchIcon" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  )
} 
