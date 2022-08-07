import { getUserSuccess, editName, getUserFail } from "./features/userSlice";
import { logout } from "./features/loginSlice";
import { getUser } from "./userApi";

export default function getUserProfile(dispatch) {
	getUser()
		.then((userName) => {
			dispatch(getUserSuccess(userName));
		})
		.catch((error) => {
			if (error.response.status === 401) {
				dispatch(logout());
				dispatch(editName(false));
				localStorage.clear();
			} else {
				dispatch(
					getUserFail(
						"Oups! Nous rencontrons des difficultés à charger la page demandée.",
					),
				);
				console.log(error);
			}
		});
}
