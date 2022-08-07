import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {},
	error: "",
	isEditName: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		getUserSuccess: (state, { payload }) => {
			state.user = payload;
			state.error = "";
		},

		getUserFail: (state, { payload }) => {
			state.error = payload;
		},

		editName: (state, { payload }) => {
			state.isEditName = payload;
		},
	},
});

const { reducer, actions } = userSlice;

export const { getUserSuccess, getUserFail, editName } = actions;

export default reducer;
