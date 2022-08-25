import { ProSidebar, Menu, MenuItem, SidebarContent, SidebarHeader, SidebarFooter } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import "./App.css";
import ShowMovies from "./movies/ShowMovies";

function App() {
	return (
		<div className="App">
			<ProSidebar>
				<SidebarHeader>
					<div
						style={{
							padding: "24px",
							textTransform: "uppercase",
							fontWeight: "bold",
							fontSize: 16,
							letterSpacing: "1px",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						BookMyShow
					</div>
				</SidebarHeader>
				<SidebarContent>
					<Menu iconShape="circle">
						<MenuItem>Movies Page</MenuItem>
					</Menu>
				</SidebarContent>
				<SidebarFooter style={{ textAlign: "center" }}>
					<div style={{ padding: "10px" }}>For Educational Purpose</div>
				</SidebarFooter>
			</ProSidebar>
			<ShowMovies />
		</div>
	);
}

export default App;
