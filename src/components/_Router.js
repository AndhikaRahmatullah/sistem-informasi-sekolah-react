import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import { useUser } from "../context/user";

const _Router = () => {
	const { uid } = useUser()

	return (
		<Routes>
			<Route
				path="/"
				element={ uid ? <Navigate to="/dashboard" /> : <SignIn /> }
			/>

			<Route
				path="/daftar"
				element={ <SignUp /> }
			/>

			<Route
				path="/dashboard"
				element={ !uid ? <Navigate to="/" /> : <Dashboard /> }
			/>
		</Routes>
	);
};

export default _Router;
