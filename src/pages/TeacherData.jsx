import { useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/user";
import useGetDatabase from "../hooks/useGetDatabase";
import TeacherDataEdit from "../components/TeacherData/TeacherDataEdit";
import { uid } from "uid";

const TeacherData = () => {
	// path
	const { pathname } = useLocation();
	const splitLocation = pathname.split("/");
	const splitLocation1 = splitLocation[1];
	const userPath = useRef("");

	const redirect = useNavigate();

	// data from users database
	const usersDatabase = useRef({});

	// data from teachersDatabase
	const teachersDatabase = useRef({});

	// current user
	const { email } = useUser();

	// visible only to administrators
	if (email !== "admin@school.org") redirect(`/${userPath.current}/dashboard`);

	// get users database
	const getPosts = useGetDatabase("users", true);
	const { values, isLoading, getValueLater, exist, error } = getPosts;

	// // get teachers database
	// const getPostsTeachers = useGetDatabase("users", true);
	// const { values, isLoading, getValueLater, exist, error } = getPostsTeachers;

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
	if (usersDatabase.current.accountID) {
		const accountID = usersDatabase.current.accountID;
		userPath.current = accountID.replace(/\s/g, "");

		if (splitLocation1 !== userPath.current) redirect(`/${userPath.current}/data-guru`);
	}

	return (
		<div className="container py-10">
			<div className="ml-[250px]">
				{/* header */}
				<p className="text-right text-4xl font-bold text-dark">Data Guru</p>

				<div className="mt-20">
					<div className="flex items-center justify-between">
						{/* total users */}
						<p className="text-2xl font-bold text-dark">
							Total Guru / Tenaga Pengajar : <span className="text-3xl text-dark/50">{usersDatabase.current.totalUsers}</span>
						</p>
						{/* add teacher */}
						<button className="">
							<img
								src={require("../assets/icons/add.png")}
								alt="tambah"
								className="w-[50px] transition-all duration-300 hover:grayscale"
							/>
						</button>
					</div>

					{/* table data */}
					<table className="mt-3 min-w-full">
						<thead className="bg-dark">
							<tr>
								<th
									scope="col"
									className="w-4/12 border-r border-light py-4 text-center text-xl font-medium tracking-wide text-light">
									NUPTK
								</th>
								<th
									scope="col"
									className="w-4/12 border-r border-light py-4 text-center text-xl font-medium tracking-wide text-light">
									Nama Lengkap
								</th>
								<th
									scope="col"
									className="w-3/12  border-r border-light py-4 text-center text-xl font-medium tracking-wide text-light">
									Posisi
								</th>
								<th
									scope="col"
									className="w-1/12  py-4 text-center text-xl font-medium tracking-wide text-light">
									Ubah
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
											<td className="whitespace-nowrap border-l border-neutral-300 px-5 py-4 text-lg tracking-wide text-dark">{i.nuptk}</td>
											<td className="whitespace-nowrap border-x border-neutral-300 px-5 py-4 text-lg tracking-wide text-dark">{i.username}</td>
											<td className="whitespace-nowrap border-r border-neutral-300 px-5 py-4 text-lg tracking-wide text-dark">{i.position}</td>
											<td className="whitespace-nowrap border-r border-neutral-300 px-5 py-4">
												<TeacherDataEdit
													id={i.accountID}
													email={i.email}
													fullName={i.username}
													nuptk={i.nuptk}
													position={i.position}
												/>
											</td>
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

export default TeacherData;
