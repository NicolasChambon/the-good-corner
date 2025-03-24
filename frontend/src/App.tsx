import Header from "./components/Header";
import RecentsAds from "./components/RecentsAds";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <RecentsAds />
      </main>
    </>
  );
}

export default App;
