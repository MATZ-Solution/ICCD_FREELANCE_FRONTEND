import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/slices/userSlice'
import { useCheck } from '../api/client/user'
import Navbar from './component/navbar'

function App() {
  
const count = useSelector((state) => state.counter.value)
const dispatch = useDispatch()

const { data, error, isSuccess, isPending, isError } = useCheck()
console.log("data: ", data)

  return (
    <>
    <Navbar/>
      <h1>Hello World</h1>
      <p>{count}</p>
       <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
    </>
  )
}

export default App
