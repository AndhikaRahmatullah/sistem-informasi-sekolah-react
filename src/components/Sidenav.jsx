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

	// data from users database
	const usersDatabase = useRef({});

	// current user
	const { email } = useUser();

	// get users database
	const getPosts = useGetDatabase("users", false);
	const { values, isLoading, getValueLater, exist, error } = getPosts;

	// validation user database
	if (values && email) {
		values.map((e) => {
			if (email === e.email) {
				usersDatabase.current = {
					accountID: e.accountID,
					username: e.username,
				};
			}
		});
	}

	useEffect(() => {
		getValueLater();
	}, [email]);

	// validation path
	if (usersDatabase.current.username) {
		const username = usersDatabase.current.username;
		userPath.current = username.replace(/\s/g, "");
	}

	return (
		splitLocation1 !== "" &&
		splitLocation1 !== "daftar" &&
		usersDatabase.current.accountID &&
		splitLocation1 === usersDatabase.current.accountID && (
			<div className="relative">
				<nav className="fixed left-0 flex h-screen w-[250px] flex-col justify-between bg-dark shadow-xl shadow-neutral-900/60">
					<div className="flex flex-col gap-5">
						{/* user */}
						<div className="bg-primary py-10 px-2">
							<p className="text-center text-2xl font-bold text-light">{usersDatabase.current.username}</p>
						</div>

						<div className="flex flex-col gap-3 px-5">
							{/* dashboard */}
							<Link
								to={`${usersDatabase.current.accountID}/dashboard`}
								className="text-xl font-medium uppercase text-light">
								Dashboard
							</Link>

							{/* siswa kelas */}
							<Link
								to={`${usersDatabase.current.accountID}/dashboard`}
								className="text-xl font-medium uppercase text-light">
								Siswa kelas VI
							</Link>
						</div>
					</div>

					<div className="flex flex-col items-start gap-3 border-t-2 border-light/50 px-5 py-5">
						{/* profile */}
						<Link
							to={`${usersDatabase.current.accountID}/dashboard`}
							className="text-xl font-medium uppercase text-light/50">
							Profil
						</Link>
						{/* signout */}
						<button
							onClick={Keluar}
							className="text-xl font-medium uppercase text-light/50">
							Keluar
						</button>
					</div>
				</nav>
			</div>
		)
	);
};

export default Sidenav;
