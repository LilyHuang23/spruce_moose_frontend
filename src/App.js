import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { Switch, Route } from 'react-router-dom';
import Plants from "./components/Plants";
import Plant from "./components/Plant";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/plants" component={Plants} />
        <Route exact path="/plants/:id" component={Plant} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </>
  );
}

export default App;
