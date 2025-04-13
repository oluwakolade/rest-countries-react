import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Detail from "./components/Detail";
import { Routes, Route } from "react-router-dom";


function App() {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <main className="bg-country h-screen">
      <Header dark={dark} setDark={darkModeHandler} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<Detail />} />
      </Routes>
    </main>
  );
}

export default App;
