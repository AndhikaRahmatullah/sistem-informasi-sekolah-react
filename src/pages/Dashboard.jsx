const Dashboard = () => {
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
					<div className="flex h-[200px] w-[370px] flex-col justify-between bg-red-500 pt-4">
						<p className="px-3 text-5xl font-extrabold text-light">12</p>
						<p className="px-3 text-2xl font-medium text-light">Data Guru</p>
						<a
							href="#"
							className="bg-red-600 px-3 py-1 text-center text-xl font-medium text-white">
							Lihat Lebih
						</a>
					</div>

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

					{/* mata pelajaran */}
					<div className="flex h-[200px] w-[370px] flex-col justify-between bg-teal-500 pt-4">
						<p className="px-3 text-5xl font-extrabold text-light">20</p>
						<p className="px-3 text-2xl font-medium text-light">Mata Pelajaran</p>
						<a
							href="#"
							className="bg-teal-600 px-3 py-1 text-center text-xl font-medium text-white">
							Lihat Lebih
						</a>
					</div>

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
