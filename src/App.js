import PublicLayout from "./layouts/PublicLayaout";
import PrivateLayout from "./layouts/PrivateLayout";
import Index from "./pages/Index";
import ProductosAdmin from "./pages/admin/Productos";
import VentasAdmin from "./pages/admin/Ventas";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/styles.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={["/admin/productos", "/admin/ventas"]}>
            <PrivateLayout>
              <Switch>
                <Route path="/admin/productos">
                  <ProductosAdmin />
                </Route>
                <Route path="/admin/ventas">
                  <VentasAdmin />
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
