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
    <div className="bg-secondary bg-opacity-25 w-100 position-relative h-100">
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/records" element={<RecordsScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
