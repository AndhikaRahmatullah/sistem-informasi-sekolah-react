import { Link, useLocation } from "react-router-dom";
import { SignOut as Keluar } from "../services/authentication";
const Sidenav = () => {
	const { pathname } = useLocation();
	let splitLocation = pathname.split("/");
	splitLocation = splitLocation[1]; // pathname

	return (
		splitLocation !== "" &&
		splitLocation !== "daftar" && (
			<div className="relative">
				<nav className="fixed left-0 flex h-screen w-[250px] flex-col justify-between bg-primary px-5 py-10 shadow-xl shadow-neutral-900/60">
					<div className="flex flex-col gap-5">
						{/* user */}
						<div className="">
							<p className="text-center text-4xl font-bold text-light">Admin</p>
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
