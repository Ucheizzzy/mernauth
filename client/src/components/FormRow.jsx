const FormRow = ({ name, type, labelText, defaultValue = '' }) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={name} className='text-start my-2 text-md '>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='bg-slate-200 rounded-lg p-3'
        defaultValue={defaultValue}
        required
      />
    </div>
  )
}

export default FormRow
