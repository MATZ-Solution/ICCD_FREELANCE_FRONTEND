import { useSelector } from 'react-redux'
import { useCheck } from '../../api/client/user'
import useLogout from '../../hooks/useLogout'
import Banner from '../component/banner'
import Navbar from '../component/navbar'

function Dashboard() {

  const logout = useLogout()
  const { data, error, isSuccess, isPending, isError } = useCheck()
  console.log("data: ", data)

  const selector = useSelector((state) => state.user.userDetails)
  console.log("user details: ", selector)

  return (
    <div>
      <Navbar />
      <p>dashboard</p>
      <button onClick={logout}>Logout</button>
      <Banner />
    </div>
  )
}

export default Dashboard