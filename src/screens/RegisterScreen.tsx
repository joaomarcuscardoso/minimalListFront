import { Button } from "components/Button"
import { ContentInput } from "components/ContentInput"
import { Form } from "components/Form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { IErrorMessage, IUser } from "types"
import { API_URL } from "types/apiURL"
import axios, { AxiosError } from "axios"

export function RegisterScreen() {
  const [cookies, setCookie] = useCookies()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nickname, setNickname] = useState("")
  const [error, setError] = useState("")
  const [errros, setErrors] = useState([])
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [nicknameError, setNicknameError] = useState("")

  const navigate = useNavigate()

  const setUserCookie = (user: IUser) => {
    setCookie("user", user, { path: "/"})
  }

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (email && password && nickname) {
      if (password.length < 6) {
        setPasswordError("Senha deve ter no mínimo 6 caracteres")
        return
      }

      setEmailError("")
      setPasswordError("")
      setNicknameError("")

      axios.post<IUser>(`${API_URL}/api/user/register`, {
        nickname: nickname,
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
              const { error, register }: IErrorMessage = err?.response?.data as IErrorMessage
              setError(error)
            }
          }
        })
    } else {
      // set form invalid feedback
      setPasswordError("Campo obrigatório")
      setEmailError("Campo obrigatório")
      setNicknameError("Campo obrigatório")
    }
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 className="title h1">Crie sua conta</h1>
          <Form
            error={error}
          >
            <ContentInput
              label="email"
              text="Email"
              type="email"
              placeholder="Digite seu email..."
              name="email"
              state={email}
              error={emailError}
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
              error={passwordError}
            />
            <ContentInput
              label="pass"
              text="Senha"
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              state={nickname}
              setState={setNickname}
              error={nicknameError}
              required={true}
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
