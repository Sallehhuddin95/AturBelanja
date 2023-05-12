import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { ExpenseRecordsScreen, HomeScreen } from "./screens";

function App() {
  return (
    <div className="bg-secondary bg-opacity-25 h-auto">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/expense" element={<ExpenseRecordsScreen />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
