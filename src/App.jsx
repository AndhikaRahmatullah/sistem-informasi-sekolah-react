import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/user";
import AuthStateChangeProvider from "./context/auth";
import _Router from "./components/_Router";
import Sidenav from "./components/Sidenav";

const App = () => {
	return (
		<div className="App">
			<UserProvider>
				<AuthStateChangeProvider>
					<BrowserRouter>
						<Sidenav />
						<_Router />
					</BrowserRouter>
				</AuthStateChangeProvider>
			</UserProvider>
		</div>
	);
};

export default App;
