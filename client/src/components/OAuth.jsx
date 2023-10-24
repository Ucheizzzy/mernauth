import { toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import customFetch from '../utils/customFetch'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../feature/userSlice'
const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const { displayName: name, email, photoURL: avatar } = result.user
      const json = JSON.stringify({ name, email, avatar })
      const { data } = await customFetch.post('/auth/google', json, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json',
        },
      })
      dispatch(loginUser(data))
      console.log(data.avatar)
      toast.success('Login with google successful')
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }
  return (
    <button
      className='btn-auth capitalize'
      type='button'
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  )
}

export default OAuth
