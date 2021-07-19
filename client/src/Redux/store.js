import { createStore, combineReducers, applyMiddleware, compose } from "redux"
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
    compose(
        applyMiddleware(...middleware)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

)

console.log("in store", store.getState())

export default store