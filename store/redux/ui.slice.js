import { createSlice } from '@reduxjs/toolkit'

export const defaultUiState = {
  activeNavKey: 'home',
  theme: 'dark'
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: defaultUiState,
  reducers: {
    setActiveNavKey(state, action) {
      state.activeNavKey = action.payload
    },
    setTheme(state, action) {
      state.theme = action.payload
      localStorage.setItem('darkMode', action.payload === 'dark')
      document.documentElement.classList.toggle(
        'dark',
        action.payload === 'dark'
      )
    }
  }
})

const { reducer, actions } = uiSlice

export const { setActiveNavKey, setTheme } = actions

export default reducer
