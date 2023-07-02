import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import CameraPage from "./pages/CameraPage";
import Help from "./pages/Help";
// import About from "./pages/About";
import ProjectDetails from "./pages/ProjectDetails";


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route  element={<PrivateRoute/>}>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/camera" element={<CameraPage/>} />
            <Route exact path="/help" element={<Help/>} />
            {/* <Route exact path="/contact" element={<About/>} /> */}
            <Route exact path="/details" element={<ProjectDetails/>} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
