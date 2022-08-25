import { Container, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";

const products = [];

const columns = [
	{
		dataField: "name",
		text: "Name",
	},
	{
		dataField: "cast",
		text: "Cast",
	},
	{
		dataField: "language",
		text: "Language",
	},
	{
		dataField: "genre",
		text: "Genre",
	},
];
const ShowMovies = () => {
	return (
		<Container fluid>
			<div className="display-1">Movies</div>
			<Row style={{ marginTop: "10px" }}>
				<BootstrapTable keyField="id" data={products} columns={columns} />
			</Row>
		</Container>
	);
};

export default ShowMovies;
