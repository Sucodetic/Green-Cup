import PublicLayout from "./layouts/PublicLayaout";
import PrivateLayout from "./layouts/PrivateLayout";
import Index from "./pages/Index";
import Admin from "./pages/Index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/styles.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={["/admin"]}>
            <PrivateLayout>
              <Switch>
                <Route path="/admin">
                  <Admin />
                </Route>
              </Switch>
            </PrivateLayout>
          </Route>
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
