import { createStore, combineReducers, applyMiddleware } from "redux"
import userReducer from "./reducers/userReducer"
import reduxThunk from 'redux-thunk'
import socketMiddleware from "./middleware/middleware"



const rootReducer = combineReducers({
    user: userReducer
})


const middleware = [
    reduxThunk,
    socketMiddleware()
]

const store = createStore(rootReducer,
    applyMiddleware(...middleware)
)

console.log("in store", store.getState())

export default store