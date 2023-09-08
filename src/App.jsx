import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadFile from './components/UploadFile'
import OperatingAssumptions from './components/OperatingAssumptions'
import ProductionAssumptions from "./components/ProductionAssumptions"
import PricingAssumptions from "./components/PricingAssumptions"
import FinancialModel from "./components/FinancialModel"
import FinancialSummary from "./components/FinancialSummary"
import {BrowserRouter, Route, NavLink, Outlet, Routes} from 'react-router-dom'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <nav className="nav">
        <NavLink to="FinancialModel" activeclassname="active">Financial Summary</NavLink>
        <NavLink to="OperatingAssumptions" activeclassname="active">Operations Assumptions</NavLink>
        <NavLink to="ProductionAssumptions" activeclassname="active">Production Assumptions</NavLink>
        <NavLink to="PricingAssumptions" activeclassname="active">Pricing Assumptions</NavLink>
      </nav>

      <Routes>
      
        <Route path="FinancialModel" element={<FinancialModel/>} />
        <Route path="OperatingAssumptions" element={<OperatingAssumptions/>} />
        <Route path="ProductionAssumptions" element={<ProductionAssumptions/>} />
        <Route path="PricingAssumptions" element={<PricingAssumptions/>} />

      </Routes>
      

    </BrowserRouter>
  )
}

export default App
