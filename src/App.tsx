import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ListView from "./Pages/ListView/ListView";
import Gallery from "./Pages/Gallery/Gallery";
import useData from "./hooks/useData";
import DetailView from "./Pages/DetailView/DetailView";

function App() {
    const data = useData();
    return (
        <div className="App">
            <BrowserRouter basename="/CS409_MP2">
                <nav className="nav">
                    <p>Art Institute of Chicago Catalog</p>
                    <Link className="link" to="/">List View</Link>
                    <Link className="link" to="/gallery">Gallery</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<ListView data={data} />} />
                    <Route path="/gallery" element={<Gallery data={data} />} />
                    <Route path="/details/:id" element={<DetailView data={data} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
