export const authenticatedUser = (req, res, next) => {
  const { token } = req.cookies
  console.log(token)
}
