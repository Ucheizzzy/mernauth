import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
const Error = () => {
  const error = useRouteError()
  if (error.status === 404) {
    return (
      <main className='min-h-screen text-center flex items-center justify-center'>
        <div>
          <img
            src={img}
            alt='not-found'
            className='w-[90vw] max-w-[600px] mb-[2rem] mt-[-3rem]'
          />
          <h3 className='mb-3 text-slate-200 capitalize text-xl'>
            Oops!! page not found
          </h3>
          <p className='text-slate-200 text-sm mb-3 capitalize'>
            we can't seem to find the page you are looking for..
          </p>
          <Link to='/' className='capitalize'>
            Back to home
          </Link>
        </div>
      </main>
    )
  }
  return (
    <main className='min-h-screen text-center flex items-center justify-center'>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </main>
  )
}

export default Error
