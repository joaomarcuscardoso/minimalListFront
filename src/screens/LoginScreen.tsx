import { Button } from "components/Button"
import { ContentInput } from "components/ContentInput"
import { Form } from "components/Form"

export function LoginScreen() {
  const handleLogin = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("handleLogin: ")
  }
  return (
    <div className="container-fluid" >
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="title h1">Acesse sua conta</h1>
          <Form>
            <ContentInput label="email" text="Email" type="email" placeholder="Digite seu email..." />
            <ContentInput label="pass" text="Senha" type="password" placeholder="Digite sua senha..." />
            <Button type="submit" classBtn="btn btn-primary" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleLogin(e)}>Entrar</Button>
          </Form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  )
}
