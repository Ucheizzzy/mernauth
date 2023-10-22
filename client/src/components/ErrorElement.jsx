import { useRouteError } from 'react-router-dom'

const ErrorElement = () => {
  const error = useRouteError()
  return <div>There was an error {error.message}</div>
}

export default ErrorElement
