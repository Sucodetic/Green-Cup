import PublicLayout from "./layouts/PublicLayaout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/styles.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={["/admin", "/admin/productos", "admin/ventas"]}></Route>
          <PublicLayout>
            <Route path="/"></Route>
          </PublicLayout>
          <Route path={["/"]}>
            <PublicLayout>
              <Route path="/"></Route>
            </PublicLayout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
