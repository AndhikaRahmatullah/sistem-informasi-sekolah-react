import React from "react";
import { SignOut as Keluar } from "../services/authentication";

const Dashboard = () => {
	return (
		<div>
			<button onClick={Keluar}>Keluar</button>
		</div>
	);
};

export default Dashboard;
