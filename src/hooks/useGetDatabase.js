import { useState, useRef, useEffect } from "react";
import { ref, child, get } from "firebase/database";
import { database } from "../services/authentication";

const useGetDatabase = (path, initialLoad = true) => {

	const [isLoading, setIsLoading] = useState(initialLoad);
	const exist = useRef(false)
	const snapshot = useRef(null);
	const error = useRef(null);
	const dataValue = useRef(null)

	useEffect(() => {
		if (isLoading) {
			getValue()
		}
	}, [isLoading])

	const getValue = async () => {
		try {
			const rootReference = ref(database);
			const dbGet = await get(child(rootReference, path));
			const dbValue = dbGet.val();
			exist.current = dbGet.exists()
			snapshot.current = dbValue;
			// merubah objek menjadi array
			dataValue.current = Object.values(snapshot.current);
		} catch (getError) {
			error.current = getError.message;
		}
		setIsLoading(false);
	};

	const getValueLater = () => {
		snapshot.current = null
		error.current = null
		setIsLoading(true)
	}

	return {
		isLoading,
		exist: exist.current,
		getValueLater,
		values: dataValue.current,
		error: error.current
	}
}

export default useGetDatabase