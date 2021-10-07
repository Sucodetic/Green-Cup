import PublicLayout from "./layouts/PublicLayaout";
import Index from "./pages/Index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/styles.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={["/admin", "/admin/productos", "admin/ventas"]}></Route>
          <PublicLayout>
            <Route path="/admin"></Route>
          </PublicLayout>
          <Route path={["/"]}>
            <PublicLayout>
              <Route path="/">
                <Index />
              </Route>
            </PublicLayout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
