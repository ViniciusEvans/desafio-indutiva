import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </div>
  );
}

export default App;
