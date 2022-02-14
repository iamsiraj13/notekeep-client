import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import MyNotes from "./pages/MyNotes/MyNotes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ minHeight: "90vh" }}>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path="/mynotes">
            <MyNotes/>
          </Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
