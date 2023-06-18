type Props = {
  error?: string
  children: React.ReactNode
}

export function Form({error, children} : Props) {
  return (
    <div className="container-fluid">
      <form className="needs-validation">
        {error && 
          <div className="alert alert-danger" role="alert" id="errorMessage">
            {error}
          </div>
        }
        {children}
      </form>
    </div>
  )
}
