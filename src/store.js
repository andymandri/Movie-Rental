import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const composeEnhancers = composeWithDevTools({
  trace: true,
});
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
