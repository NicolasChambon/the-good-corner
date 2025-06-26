import RecentsAds from "./components/RecentsAds";
import { Route, Routes } from "react-router";
import Layout from "./pages/Layout";
import About from "./pages/About";
import AdDetails from "./pages/AdDetails/AdDetails";
import "./App.css";
import NewAdForm from "./pages/NewAdForm/NewAdForm";
import BackOffice from "./pages/BackOffice/BackOffice";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RecentsAds />} />
          <Route path="ad/:id" element={<AdDetails />} />
          <Route path="about" element={<About />} />
          <Route path="ad/new" element={<NewAdForm type="new" />} />
          <Route path="backoffice" element={<BackOffice />} />
          <Route path="ad/:id/edit" element={<NewAdForm type="edit" />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

// TODO :  faire le ménage sur le back
// TODO :  virer les commentaires
// TODO :  checker les dépendances inutilisées
// TODO :  dynamiser les urls avec des variables d'environnement
// TODO :  checker les doublons d'interfaces, types, etc
