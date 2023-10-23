import { Form, redirect, useNavigate, useNavigation } from 'react-router-dom'
import { FormRow } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { logoutUser } from '../feature/userSlice'

export const loader = (store) => () => {
  const { currentUser } = store.getState().userState
  if (!currentUser) {
    toast.warn('You must be logged in to see profile')
    return redirect('/login')
  }
  return null
}

const Profile = () => {
  const { currentUser } = useSelector((state) => state.userState)
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogoutUser = async () => {
    navigate('/')
    await customFetch.get('/auth/logout')
    toast.success(`See you soon ${currentUser?.name}`)
    dispatch(logoutUser())
  }
  return (
    <div className='p-3 mt-10 max-w-md bg-slate-50 mx-auto text-slate-700 text-center rounded-md'>
      <h1 className='text-3xl font-semibold my-5'>Profile</h1>
      <Form method='POST' className='flex flex-col gap-4 px-4 '>
        <FormRow
          type='text'
          name='name'
          labelText='Name'
          defaultValue={currentUser?.name}
        />
        <FormRow
          type='email'
          name='email'
          labelText='Email'
          defaultValue={currentUser?.email}
        />
        <FormRow type='password' name='password' labelText='Password' />

        <button
          type='submit'
          className='btn-nice uppercase'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading..' : 'Update'}
        </button>
      </Form>
      <div className='flex justify-between items-center my-6'>
        <span className='text-red-600 cursor-pointer'>Delete Account</span>
        <span
          className='text-red-800 cursor-pointer'
          onClick={handleLogoutUser}
        >
          Log Out
        </span>
      </div>
    </div>
  )
}

export default Profile
