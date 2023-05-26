import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import {
  RecordsScreen,
  HomeScreen,
  RegisterScreen,
  LoginScreen,
} from "./screens";

function App() {
  return (
    <div className="bg-secondary bg-opacity-25 h-auto">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/records" element={<RecordsScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
