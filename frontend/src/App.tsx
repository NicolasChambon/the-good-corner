import RecentsAds from "./components/RecentsAds";
import { Route, Routes } from "react-router";
import Layout from "./pages/Layout";
import About from "./pages/About";
import AdDetails from "./pages/AdDetails";
import "./App.css";
import NewAdForm from "./pages/NewAdForm/NewAdForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentsAds />} />
        <Route path="ad/:id" element={<AdDetails />} />
        <Route path="about" element={<About />} />
        <Route path="ad/new" element={<NewAdForm />} />
      </Route>
    </Routes>
  );
}

export default App;
