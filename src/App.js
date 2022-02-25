import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import CreateNote from "./pages/CreateNote/CreateNote";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyNotes from "./pages/MyNotes/MyNotes";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SingleNote from "./pages/SingleNote/SingleNote";
import ProfilePage from './pages/ProfilePage/ProfilePage'

function App() {

  const [ search, setSearch ] = useState(""); 
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main style={{ minHeight: "90vh" }}>
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path="/mynotes">
            <MyNotes search={search} />
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/register">
            <RegisterPage/>
          </Route>
          <Route path="/createnote">
            <CreateNote/>
          </Route>
          <Route path="/note/:editId">
            <SingleNote/>
          </Route>
          <Route path="/profile">
            <ProfilePage/>
          </Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
