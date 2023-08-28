import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import PostMusic from "./pages/PostMusic"
import Home from "./components/Home"

function App() {

  return (
    <>
      <div id="appWrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploadmusic" element={<PostMusic />} />
        </Routes>
      </div>
    </>
  )
}

export default App
