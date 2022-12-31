import { useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/user";
import useGetDatabase from "../hooks/useGetDatabase";

const Dashboard = () => {
	// path
	const { pathname } = useLocation();
	const splitLocation = pathname.split("/");
	const splitLocation1 = splitLocation[1];

	const redirect = useNavigate();

	// data from users database
	const usersDatabase = useRef({});

	// data for position exists
	const positionExists = [];

	// current user
	const { email } = useUser();

	// get users database
	const getPosts = useGetDatabase("users", true);
	const { values, isLoading, getValueLater, exist, error } = getPosts;

	// validation user database
	if (values) {
		usersDatabase.current = {
			totalUsers: values.length,
		};
		values.map((e) => {
			if (e.position) {
				positionExists.push(e.username);
			}

			if (email === e.email) {
				usersDatabase.current = {
					...usersDatabase.current,
					accountID: e.accountID,
					email: e.email,
					username: e.username,
				};
			}
		});
	}

	// validation path
	if (usersDatabase.current.accountID && splitLocation1 !== usersDatabase.current.accountID) redirect(`/${usersDatabase.current.accountID}/dashboard`);

	return (
		<div className="container py-10">
			<div className="ml-[250px]">
				{/* header */}
				<p className="text-right text-4xl font-bold text-dark">Dashboard</p>

				{/* body */}
				<div className="mt-20 flex flex-wrap gap-5">
					{/* data siswa */}
					<div className="flex h-[200px] w-[370px] flex-col justify-between bg-orange-500 pt-4">
						<p className="px-3 text-5xl font-extrabold text-light">1</p>
						<p className="px-3 text-2xl font-medium text-light">Data Sekolah</p>
						<a
							href="#"
							className="bg-orange-600 px-3 py-1 text-center text-xl font-medium text-white">
							Lihat Lebih
						</a>
					</div>

					{/* data guru */}
					{/* visible only to administrators */}
					{usersDatabase.current.email === "admin@school.org" && (
						<div className="flex h-[200px] w-[370px] flex-col justify-between bg-red-500 pt-4">
							<p className="px-3 text-5xl font-extrabold text-light">{positionExists.length}</p>
							<p className="px-3 text-2xl font-medium text-light">Data Guru</p>
							<Link
								to={`/${usersDatabase.current.accountID}/data-guru`}
								className="bg-red-600 px-3 py-1 text-center text-xl font-medium text-white">
								Lihat Lebih
							</Link>
						</div>
					)}

					{/* data siswa */}
					<div className="flex h-[200px] w-[370px] flex-col justify-between bg-green-500 pt-4">
						<p className="px-3 text-5xl font-extrabold text-light">240</p>
						<p className="px-3 text-2xl font-medium text-light">Data Siswa</p>
						<a
							href="#"
							className="bg-green-600 px-3 py-1 text-center text-xl font-medium text-white">
							Lihat Lebih
						</a>
					</div>

					{/* data pengguna */}
					{/* visible only to administrators */}
					{usersDatabase.current.email === "admin@school.org" && (
						<div className="flex h-[200px] w-[370px] flex-col justify-between bg-lime-500 pt-4">
							<p className="px-3 text-5xl font-extrabold text-light">{usersDatabase.current.totalUsers}</p>
							<p className="px-3 text-2xl font-medium text-light">Data Pengguna</p>
							<Link
								to={`/${usersDatabase.current.accountID}/data-pengguna`}
								className="bg-lime-600 px-3 py-1 text-center text-xl font-medium text-white">
								Lihat Lebih
							</Link>
						</div>
					)}

					{/* mata pelajaran */}
					{/* visible only to administrators */}
					{usersDatabase.current.email === "admin@school.org" && (
						<div className="flex h-[200px] w-[370px] flex-col justify-between bg-teal-500 pt-4">
							<p className="px-3 text-5xl font-extrabold text-light">20</p>
							<p className="px-3 text-2xl font-medium text-light">Mata Pelajaran</p>
							<a
								href="#"
								className="bg-teal-600 px-3 py-1 text-center text-xl font-medium text-white">
								Lihat Lebih
							</a>
						</div>
					)}

					{/* jadwal sekolah */}
					<div className="flex h-[200px] w-[370px] flex-col justify-between bg-indigo-500 pt-4">
						<p className="px-3 text-5xl font-extrabold text-light">5</p>
						<p className="px-3 text-2xl font-medium text-light">Jadwal Sekolah</p>
						<a
							href="#"
							className="bg-indigo-600 px-3 py-1 text-center text-xl font-medium text-white">
							Lihat Lebih
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
