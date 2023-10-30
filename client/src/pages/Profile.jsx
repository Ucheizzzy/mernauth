import {
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { FormRow } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { logoutUser, updateUser } from '../feature/userSlice'
import { useEffect, useRef, useState } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'

export const loader = (store) => () => {
  //private route
  const { currentUser } = store.getState().userState
  if (!currentUser) {
    toast.warn('You must be logged in to see profile')
    return redirect('/login')
  }
  return currentUser
}

const Profile = () => {
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (image) handleFileUpload(image)
  }, [image])

  const handleFileUpload = async (image) => {
    const storage = getStorage(app)
    const filename = new Date().getTime() + image.name
    const storageRef = ref(storage, filename)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImagePercent(Math.round(progress))
      },
      (error) => {
        setImageError(true)
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        )
      }
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }
  const currentUser = useLoaderData()
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
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-4 '>
        <input
          type='file'
          name='avatar'
          accept='image/*'
          hidden
          ref={fileRef}
          onChange={(e) => setImage(e.target.files[0])}
        />

        <img
          src={formData.avatar || currentUser?.avatar}
          alt={currentUser?.name}
          className='h-24 w-24 self-center rounded-full object-cover cursor-pointer'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {!image ? (
            <span className='text-purple-700'>
              Click avatar to change. Less than 2MB
            </span>
          ) : imageError ? (
            <span className='text-red-700'>
              Upload a valid image less than 2MB
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`uploading: ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <FormRow
          type='text'
          name='name'
          labelText='Name'
          defaultValue={currentUser?.name}
          onChange={handleChange}
        />
        <FormRow
          type='email'
          name='email'
          labelText='Email'
          defaultValue={currentUser?.email}
          onChange={handleChange}
        />
        <div className='flex flex-col'>
          <label htmlFor='password' className='text-start my-2 text-md '>
            Password
          </label>
          <input
            type='password'
            name='password'
            onChange={handleChange}
            className='bg-slate-200 rounded-lg p-3'
            id='password'
          />
        </div>

        <button
          type='submit'
          className='btn-nice uppercase'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading..' : 'Update'}
        </button>
      </form>
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
