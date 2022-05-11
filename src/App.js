import "./styles.css";
import Blog from "./Components/Blog.js";
import Navbar from "./Components/Navbar/Navbar.js";
import Pages from "./Components/Pages/Pages.js";
import About from "./Components/About.js";
import Footer from "./Components/Footer.js";
import Services from "./Components/Services";
import Search from "./Components/search"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
      <>
        <Router>
          <div className="App">
            <Routes>
              <Route exact path = "/" element = {<> <Navbar/><Pages/><Services/><About/><Blog/><Footer/></>}/>
              {/* <Route path = "/search"> <Search/> </Route> */}
              <Route exact path = "/search" element = {<Search/>}/>
            </Routes>
          </div>
        </Router>
      </>
  );
}