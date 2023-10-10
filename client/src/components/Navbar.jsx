import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-3 mx-auto max-w-6xl'>
      <Link to='/'>
        <h1 className='font-bold text-slate-200 text-2xl'>MERN Auth</h1>
      </Link>

      <ul className='text-slate-200 flex gap-4'>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='about'>
          <li>About</li>
        </Link>
        <Link to='login'>
          <li>Sign In</li>
        </Link>
      </ul>
    </div>
  )
}

export default Navbar
