import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/user";
import AuthStateChangeProvider from "./context/auth";
import _Router from "./components/_Router";

const App = () => {
	return (
		<div className="App">
			<UserProvider>
				<AuthStateChangeProvider>
					<BrowserRouter>
						<_Router />
					</BrowserRouter>
				</AuthStateChangeProvider>
			</UserProvider>
		</div>
	);
};

export default App;
