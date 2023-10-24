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
    updateUser: (state, { payload }) => {
      state.currentUser = payload.user
    },
  },
})

export const { loginUser, logoutUser, updateUser } = userSlice.actions
export default userSlice.reducer
