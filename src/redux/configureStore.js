import { createStore, combineReducers } from "redux";
import Dishes from "./dishes";
import Comments from "./comments";
import Promotions from "./promotions";
import Leaders from "./leaders";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
    })
  );
  return store;
};

export default configureStore;
