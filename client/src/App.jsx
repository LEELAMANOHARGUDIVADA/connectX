import { useNavigate } from 'react-router-dom'
import Routers from './routes/Routers'
import { useEffect } from 'react'

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, []);

  return (
    <>
      <Routers />
    </>
  )
}

export default App