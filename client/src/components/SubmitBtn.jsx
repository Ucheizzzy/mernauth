import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({ title }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <button type='submit' className='btn-nice' disabled={isSubmitting}>
      {isSubmitting ? 'Loading..' : title}
    </button>
  )
}

export default SubmitBtn
