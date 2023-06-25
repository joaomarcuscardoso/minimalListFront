import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import "./assets/css/global/styles.css"
import { Route, Routes } from "react-router-dom"
import { HomeScreen } from "screens/HomeScreen"
import { ProfileScreen } from "screens/ProfileScreen"
import { ReviewScreen } from "screens/ReviewScreen"
import { LoginScreen } from "screens/LoginScreen"
import { RegisterScreen } from "screens/RegisterScreen"
import { ContentScreen } from "screens/ContentScreen"
import { LibraryScreen } from "screens/LibraryScreen"

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/review" element={<ReviewScreen />} />
        <Route path="/library" element={<LibraryScreen />} />
        <Route path="/content/:id" element={<ContentScreen />} />
      </Routes>
    </>
  )
}

export default App
