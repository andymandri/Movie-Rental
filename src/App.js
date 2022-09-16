import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/navBar";
import { loadLogin } from "./actions/loginAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLogin());
  });
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
