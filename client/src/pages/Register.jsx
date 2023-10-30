import { Form, Link, redirect, useNavigation } from 'react-router-dom'
import FormRow from '../components/FormRow'
import { OAuth } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/register', data)
    toast.success('Registration successful. Login now')
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const Register = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <div className='p-3 mt-10 max-w-md bg-slate-50 mx-auto text-slate-700 text-center rounded-md'>
      <h1 className='text-3xl font-semibold my-5'>Register</h1>
      <Form method='POST' className='flex flex-col gap-4 px-4 '>
        <FormRow type='text' name='name' labelText='Name' />
        <FormRow type='email' name='email' labelText='Email' />
        <FormRow type='password' name='password' labelText='Password' />
        <button type='submit' className='btn-nice' disabled={isSubmitting}>
          {isSubmitting ? 'Loading..' : 'Submit'}
        </button>

        <OAuth />
      </Form>
      <div className='flex gap-2 text-center justify-center items-center my-6'>
        <p>Already have an account?</p>
        <Link to='/login'>
          <span className='text-blue-500'>Login</span>
        </Link>
      </div>
    </div>
  )
}

export default Register
