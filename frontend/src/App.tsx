import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Header, ProtectedRoute } from "./components";
import {
  RecordsScreen,
  HomeScreen,
  RegisterScreen,
  LoginScreen,
} from "./screens";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3 content">
          <Routes>
            <Route path="/" element={<HomeScreen />} />

            <Route
              path="/records"
              element={
                <ProtectedRoute>
                  <RecordsScreen />
                </ProtectedRoute>
              }
            />

            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
