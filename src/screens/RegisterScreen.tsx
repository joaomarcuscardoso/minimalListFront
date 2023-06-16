import { Button } from "components/Button"
import { ContentInput } from "components/ContentInput"
import { Form } from "components/Form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function RegisterScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nickname, setNickname] = useState("")

  const navigate = useNavigate()

  const handleRegister = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("handleLogin: ")
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="title h1">Crie sua conta</h1>
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
            <ContentInput
              label="pass"
              text="Senha"
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              state={nickname}
              setState={setNickname}
            />

            <Button type="submit" classBtn="btn btn-primary" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleRegister(e)}>Salvar</Button>
            <Button type="submit" classBtn="btn btn-outline-primary" onClick={() => navigate("/login")}>Entrar</Button>
          </Form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  )
}
