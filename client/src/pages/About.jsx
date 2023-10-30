const About = () => {
  return (
    <div className='px-10 py-10 max-w-2xl mx-auto text-center bg-slate-50 rounded-md mt-10'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800 capitalize'>
        Welcome to my Auth App!
      </h1>
      <p className='mb-4 text-slate-700'>
        This application is as basic as they come, to demonstrate my knowledge
        of MERN stack basic authentication of login register, update abd delete.
        I used Tailwind CSS for styling
      </p>
      <p className='mb-4 text-slate-700'>
        Kindly test this application.You can also sign in with google. I have
        achieved this using firebase OAuth
      </p>
      <p className='mb-4 text-slate-700'>
        It is not compulsory you change your password, but you cannot leave and
        empty email and name field.
      </p>
    </div>
  )
}

export default About
