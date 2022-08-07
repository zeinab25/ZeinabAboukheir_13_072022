import axios from "axios";

const getToken = async (username, password) => {
	const response = await axios.post(
		"http://localhost:3001/api/v1/user/login",
		{
			email: username,

			password: password,
		},

		{
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		},
	);
	return response.data.body.token;
};

const getUser = async () => {
	const response = await axios.post(
		"http://localhost:3001/api/v1/user/profile",
		{},

		{
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
				"Content-Type": "application/json;charset=utf-8",
			},
		},
	);
	return response.data.body;
};

const postEditName = async (firstName, lastName) => {
	const response = await axios.put(
		"http://localhost:3001/api/v1/user/profile",
		{ firstName: firstName, lastName: lastName },

		{
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
				"Content-Type": "application/json;charset=utf-8",
			},
		},
	);
	return response.data.body;
};

export { getToken, getUser, postEditName };
