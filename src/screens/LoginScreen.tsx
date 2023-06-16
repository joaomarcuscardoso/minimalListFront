import { Button } from "components/Button"
import { ContentInput } from "components/ContentInput"
import { Form } from "components/Form"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function LoginScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // console log value input
    console.log("email: ", email)
    console.log("password: ", password)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="title h1">Acesse sua conta</h1>
          <Form>
            <ContentInput 
              label="email" 
              text="Email" 
              type="email" 
              placeholder="Digite seu email..." 
              name="email" 
              state={email}
              setState={setEmail}
            />
            <ContentInput 
              label="pass"
              text="Senha"
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              state={password}
              setState={setPassword}
            />
            <Button type="submit" classBtn="btn btn-primary" onClick={e => handleLogin(e)}>Entrar</Button>
            <Button type="submit" classBtn="btn  btn-outline-primary" onClick={() => navigate("/register")}>Criar Conta</Button>
          </Form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  )
}
