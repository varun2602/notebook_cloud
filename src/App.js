import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
    <div className="navbar">
    <Navbar/>
    </div>
    <div className="sec-class">
      <h1>This is test</h1>
    </div>
      
    {/* <div className="container components">
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home/>} />
          <Route path="about" element={<About/>} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        {/* </Route>
      </Routes>
    </BrowserRouter> */}
    {/* </div>  */}
</>
    

      
      
  )
};



export default App;
