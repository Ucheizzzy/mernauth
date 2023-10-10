import { Form, Link, useNavigation } from 'react-router-dom'
import FormRow from '../components/FormRow'
import { OAuth } from '../components'

const Register = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <div className='p-3 mt-10 max-w-md bg-slate-50 mx-auto text-slate-700 text-center rounded-md'>
      <h1 className='text-3xl font-semibold my-5'>Register</h1>
      <Form method='POST' className='flex flex-col gap-4 px-4 '>
        <FormRow
          type='text'
          name='username'
          labelText='Username'
          defaultValue='uche'
        />
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
        <p>Already have an account?</p>
        <Link to='/login'>
          <span className='text-blue-500'>Login</span>
        </Link>
      </div>
    </div>
  )
}

export default Register
