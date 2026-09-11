import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import type { RootState } from "./store/store";

function App() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  console.log("isLoggedIn:", isLoggedIn);

  return isLoggedIn ? <Dashboard /> : <Login />;
}

export default App;
