import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content mt-5">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
