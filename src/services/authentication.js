import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
	apiKey: "AIzaSyAAa9EIQwz0-rotoF4bfKcvMTJ497D8NeI",
	authDomain: "project-rapor-sisiwa.firebaseapp.com",
	databaseURL: "https://project-rapor-sisiwa-default-rtdb.firebaseio.com",
	projectId: "project-rapor-sisiwa",
	storageBucket: "project-rapor-sisiwa.appspot.com",
	messagingSenderId: "39445794004",
	appId: "1:39445794004:web:47488e9102c4454a4fff41"
};

if (!getApps().length) {
	initializeApp(firebaseConfig)
}

export const database = getDatabase()

export const FirebaseAuth = getAuth()

// deteksi status sudah login atau belum
export const Authentication = () => {
	return FirebaseAuth
}

// sign up
export const SignUp = async (email, password) => {
	await createUserWithEmailAndPassword(FirebaseAuth, email, password)
}

// sign in
export const SignIn = async (email, password) => {
	await signInWithEmailAndPassword(FirebaseAuth, email, password)
}

// sign out
export const SignOut = async () => {
	await signOut(FirebaseAuth)
}

// pesan error saat sign in
export const GetSignInErrorMessage = (code) => {
	switch (code) {
		case "auth/user-not-found":
			return "Email tidak terdaftar"
		case "auth/wrong-password":
			return "Email atau Password Salah"
	}
}

// pesan error saat sign up
export const GetSignUpErrorMessage = (code) => {
	switch (code) {
		case "auth/email-already-in-use":
			return "Email telah terdaftar."
		default:
			return "Terjadi kesalahan saat proses Sign Up."
	}
}
