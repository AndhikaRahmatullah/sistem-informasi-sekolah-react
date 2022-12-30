import { useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/user";
import useGetDatabase from "../hooks/useGetDatabase";

const UserData = () => {
	// path
	const { pathname } = useLocation();
	const splitLocation = pathname.split("/");
	const splitLocation1 = splitLocation[1];
	const userPath = useRef("");

	const redirect = useNavigate();

	// data from users database
	const usersDatabase = useRef({});

	// current user
	const { email } = useUser();

	// visible only to administrators
	if (email !== "admin@school.org") redirect(`/${usersDatabase.current.accountID}/dashboard`);

	// get users database
	const getPosts = useGetDatabase("users", true);
	const { values, isLoading, getValueLater, exist, error } = getPosts;

	// validation user database
	if (values) {
		usersDatabase.current = {
			totalUsers: values.length,
		};
		values.map((e) => {
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
	if (usersDatabase.current.accountID && splitLocation1 !== usersDatabase.current.accountID) redirect(`/${usersDatabase.current.accountID}/data-pengguna`);

	return (
		<div className="container py-10">
			<div className="ml-[250px]">
				{/* header */}
				<p className="text-right text-4xl font-bold text-dark">Data Pengguna</p>

				<div className="mt-20">
					{/* total users */}
					<p className="text-2xl font-bold text-dark">
						Total pengguna aplikasi : <span className="text-3xl text-dark/50">{usersDatabase.current.totalUsers}</span>
					</p>

					{/* table data */}
					<table className="mt-5 min-w-full">
						<thead className="bg-dark">
							<tr>
								<th
									scope="col"
									className="w-1/3 border-r border-light py-4 text-center text-xl font-medium tracking-wide text-light">
									Nama Pengguna
								</th>
								<th
									scope="col"
									className="w-1/3 border-r border-light py-4 text-center text-xl font-medium tracking-wide text-light">
									Email
								</th>
								<th
									scope="col"
									className="w-1/3  py-4 text-center text-xl font-medium tracking-wide text-light">
									Tanggal Dibuat
								</th>
							</tr>
						</thead>
						<tbody>
							{values &&
								values.map((i) => {
									return (
										<tr
											className="border-b border-neutral-300 bg-white"
											key={i.email}>
											<td className="whitespace-nowrap border-l border-neutral-300 px-5 py-4 text-lg tracking-wide text-dark">{i.username}</td>
											<td className="whitespace-nowrap border-x border-neutral-300 px-5 py-4 text-lg tracking-wide text-dark">{i.email}</td>
											<td className="whitespace-nowrap border-r border-neutral-300 px-5 py-4 text-lg tracking-wide text-dark">{i.createdTime}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default UserData;
