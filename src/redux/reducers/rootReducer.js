import { combineReducers } from "redux";
import todoReducer from "./todo/"

const appReducer = combineReducers({
    todoApp: todoReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}
export default rootReducer
