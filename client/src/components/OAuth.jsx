import { toast } from 'react-toastify'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import customFetch from '../utils/customFetch'
import { redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../feature/userSlice'
const OAuth = () => {
  const dispatch = useDispatch()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const { displayName, email, photoURL } = result.user
      const { data } = await customFetch.post(
        '/auth/google',
        displayName,
        email,
        photoURL
      )
      dispatch(loginUser(data))
      toast.success('Login with google successful')
      redirect('/')
    } catch (error) {
      toast.error(error)
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
