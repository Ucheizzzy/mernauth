import { createSlice } from '@reduxjs/toolkit'

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null
}
const initialState = {
  currentUser: getUserFromLocalStorage(),
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      const user = payload.user
      state.currentUser = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logoutUser: (state) => {
      state.currentUser = null
      localStorage.removeItem('user')
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer
