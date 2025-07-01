import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/sendMoney'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/signUp' element={<SignUp/>}/>
       <Route path='/signIn' element={<SignIn/>}/>
       <Route path='/dashBoard' element={<Dashboard/>}/>
      <Route path='/send' element={<SendMoney/>}/> 

      
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
