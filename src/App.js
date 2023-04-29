import React, { createContext, useReducer } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/login.component'
import SignUp from './components/signup.component'
import Home from './components/home'
import { inititalState,reducer } from './components/reducer/UseReducer'
import CardComponent from './components/cardCom'

export const UserContext = createContext();
function App() {

  const [state,dispatch] = useReducer(reducer,inititalState)

  return (
    
    <UserContext.Provider value={{state,dispatch}}>
    <Router>
      <div className="App">
        <div className="auth-wrapper">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/sign-in" element={<Login />} />
              <Route exact path="/sign-up" element={<SignUp />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/card" element={<CardComponent />} />
            </Routes>
        </div>
      </div>
    </Router>
    </UserContext.Provider>
  )
}
export default App