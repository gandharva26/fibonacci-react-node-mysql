
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FibonacciCalculator from './components/FibonacciCalculator'
import { FibonacciResults } from './components/FibonacciResults'

export const App = () => {


  return (
    <div style= {{margin:"1%"}}>
<h3>Fibonnacci Series Calculator </h3>

<BrowserRouter>
	<Routes>
	<Route path ={ `/`} element={<FibonacciCalculator />} />
	<Route path ={ `/results`} element={<FibonacciResults/>} />
	</Routes>
	</BrowserRouter>



    </div>
  )
}
