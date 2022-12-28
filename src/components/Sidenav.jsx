import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignOut as Keluar } from "../services/authentication";
import { useUser } from "../context/user";
import useGetDatabase from "../hooks/useGetDatabase";

const Sidenav = () => {
	// path
	const { pathname } = useLocation();
	const splitLocation = pathname.split("/");
	const splitLocation1 = splitLocation[1];
	const userPath = useRef("");

	// data from database
	const userData = useRef({});

	// current user
	const { email } = useUser();

	// get database
	const getPosts = useGetDatabase("users", false);
	const { values, isLoading, getValueLater, exist, error } = getPosts;

	// validation user database
	if (values && email) {
		values.map((e) => {
			if (email === e.email) {
				userData.current = {
					username: e.username,
				};
			}
		});
	}

	useEffect(() => {
		getValueLater();
	}, [email]);

	if (userData.current.username) {
		const username = userData.current.username;
		userPath.current = username.replace(/\s/g, "");
	}

	return (
		splitLocation1 !== "" &&
		splitLocation1 !== "daftar" &&
		userData.current.username &&
		splitLocation1 === userPath.current && (
			<div className="relative">
				<nav className="fixed left-0 flex h-screen w-[250px] flex-col justify-between bg-primary px-5 py-10 shadow-xl shadow-neutral-900/60">
					<div className="flex flex-col gap-5">
						{/* user */}
						<div className="">
							<p className="text-center text-2xl font-bold text-light">{userData.current.username}</p>
						</div>

						<div className="mt-10 flex flex-col gap-3">
							{/* dashboard */}
							<Link
								to="/dashboard"
								className="text-xl font-medium uppercase text-light">
								Dashboard
							</Link>

							{/* kelas */}
							<Link
								to="/dashboard"
								className="text-xl font-medium uppercase text-light">
								Kelas VI
							</Link>
						</div>
					</div>

					{/* signout */}
					<div className="">
						<button
							onClick={Keluar}
							className="text-xl font-medium uppercase text-dark">
							Keluar
						</button>
					</div>
				</nav>
			</div>
		)
	);
};

export default Sidenav;
