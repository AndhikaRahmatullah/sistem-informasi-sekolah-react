import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "../context/user";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import UserData from "../pages/UserData";
import TeacherData from "../pages/TeacherData";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

const _Router = () => {
	const { uid } = useUser()

	return (
		<Routes>
			<Route
				path="/"
				element={ uid ? <Navigate to="/:username/dashboard" /> : <SignIn /> }
			/>

			<Route
				path="/daftar"
				element={ <SignUp /> }
			/>

			<Route
				path="/:username/dashboard"
				element={ !uid ? <Navigate to="/" /> : <Dashboard /> }
			/>

			<Route
				path="/:username/data-pengguna"
				element={ !uid ? <Navigate to="/" /> : <UserData /> }
			/>

			<Route
				path="/:username/data-guru"
				element={ !uid ? <Navigate to="/" /> : <TeacherData /> }
			/>

			<Route
				path="/:username/profil"
				element={ !uid ? <Navigate to="/" /> : <Profile /> }
			/>

			<Route
				path="*"
				element={ <NotFound /> }
			/>
		</Routes>
	);
};

export default _Router;
