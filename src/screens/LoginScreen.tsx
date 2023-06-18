import axios, { AxiosError } from "axios"
import { Button } from "components/Button"
import { ContentInput } from "components/ContentInput"
import { Form } from "components/Form"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { IErrorMessage, IUser } from "types"
import { API_URL } from "types/apiURL"

export function LoginScreen() {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const setUserCookie = (user: IUser) => {
    setCookie("user", user, { path: "/"})
  }

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (email && password) {
      setEmailError("")
      setPasswordError("")

      axios.post<IUser>(`${API_URL}/api/user/login`, {
        email: email,
        password: password
      })
        .then(res => {
          setUserCookie(res.data)
          navigate("/")

        })
        .catch((err: Error | AxiosError) => {
          if (axios.isAxiosError(err)) {
            if (err?.response?.data) {
              console.log("err: ", err?.response?.data)
              const { error, login }: IErrorMessage = err?.response?.data as IErrorMessage
              setError(error)
            }
          }
        })
    } else {
      // set form invalid feedback
      setPasswordError("Campo obrigatório")
      setEmailError("Campo obrigatório")
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="title h1">Acesse sua conta</h1>
          <Form
            error={error}
          >
            <ContentInput
              label="email"
              text="Email"
              type="email"
              placeholder="Digite seu email..."
              name="email"
              required={true}
              state={email}
              setState={setEmail}
              error={emailError}
            />
            <ContentInput
              label="password"
              text="Senha"
              type="password"
              placeholder="Digite sua senha..."
              required={true}
              name="password"
              state={password}
              setState={setPassword}
              error={passwordError}
            />
            <Button type="submit" classBtn="btn btn-primary" onClick={(e) => handleLogin(e)}>Entrar</Button>
            <Button type="submit" classBtn="btn  btn-outline-primary" onClick={() => navigate("/register")}>Criar Conta</Button>
          </Form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  )
}
