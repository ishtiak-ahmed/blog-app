import { createStore } from "redux";
import { reducers } from "../Reducers/Reducers";

export const store = createStore(reducers)