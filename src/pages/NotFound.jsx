import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="flex h-screen items-center justify-center">
			<p className="">404</p>
			<Link to="/">Kembali</Link>
		</div>
	);
};

export default NotFound;
