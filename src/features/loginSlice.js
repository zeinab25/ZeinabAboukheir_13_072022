import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuth: false,
	error: "",
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		logout: (state) => {
			state.isAuth = false;
			state.error = "";
		},
		loginSuccess: (state) => {
			state.isAuth = true;
			state.error = "";
		},

		loginFail: (state, { payload }) => {
			state.error = payload;
		},
	},
});

const { reducer, actions } = loginSlice;

export const { loginSuccess, logout, loginFail } = actions;

export default reducer;
