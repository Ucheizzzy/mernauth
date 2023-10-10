import { Form, Link, useNavigation } from 'react-router-dom'
import FormRow from '../components/FormRow'
import { OAuth } from '../components'

const Login = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <div className='p-3 mt-10 max-w-md bg-slate-50 mx-auto text-slate-700 text-center rounded-md '>
      <h1 className='text-3xl font-semibold my-5'>Login</h1>
      <Form method='POST' className='flex flex-col gap-4 px-4 '>
        <FormRow
          type='email'
          name='email'
          labelText='Email'
          defaultValue='uche@gmail.com'
        />
        <FormRow
          type='password'
          name='password'
          labelText='Password'
          defaultValue='secret'
        />
        <button type='submit' className='btn-nice' disabled={isSubmitting}>
          {isSubmitting ? 'Loading..' : 'Submit'}
        </button>

        <OAuth />
      </Form>
      <div className='flex gap-2 text-center justify-center items-center my-6'>
        <p>Don't have an account?</p>
        <Link to='/register'>
          <span className='text-blue-500'>Register</span>
        </Link>
      </div>
    </div>
  )
}

export default Login
