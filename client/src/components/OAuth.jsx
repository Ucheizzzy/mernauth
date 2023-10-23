import { toast } from 'react-toastify'

const OAuth = () => {
  const handleGoogleClick = async () => {
    try {
      console.log('Google login')
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
