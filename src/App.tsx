import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import "./assets/css/global/styles.css"
import "./assets/js/script.js"
import { Route, Routes } from "react-router-dom"
import { HomeScreen } from "screens/HomeScreen"
import { ProfileScreen } from "screens/ProfileScreen"
import { ReviewScreen } from "screens/ReviewScreen"
import { LoginScreen } from "screens/LoginScreen"
import { RegisterScreen } from "screens/RegisterScreen"

function App() {
  return (
    <div className="container-fluid" id="container-app">
      <Header />

      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/review" element={<ReviewScreen />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
