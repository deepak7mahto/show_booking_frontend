import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { loadMovies } from "../utils";
import AddMovie from "./AddMovie";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import Select from "react-select";

const ShowMovies = () => {
	const [moviesData, setMoviesData] = useState([]);

	useEffect(() => {
		reloadMovies();
	}, []);

	const locationFormatter = (cell, row) => {
		console.log(cell);
		return <div>{cell.length}</div>;
	};

	const columns = [
		{
			dataField: "movie_name",
			text: "Movie (↓↑)",
			sort: true,
		},
		{
			dataField: "cast_name",
			text: "Cast",
		},
		{
			dataField: "language",
			text: "Language (↓↑)",
			sort: true,
		},
		{
			dataField: "genre",
			text: "Genre",
		},
		{
			dataField: "locations",
			text: "No. of Locations",
			formatter: locationFormatter,
		},
	];

	const reloadMovies = () => {
		loadMovies().then((data) => {
			// console.log({ data });
			setMoviesData(data);
		});
	};

	return (
		<Container fluid>
			<div className="display-1">Movies</div>
			<Row style={{ marginTop: "10px" }}>
				<AddMovie reloadMovies={reloadMovies} />
			</Row>
			<Row style={{ marginTop: "10px" }}>
				<Col>
					<Select />
				</Col>
				<Col>
					<Select />
				</Col>
				<Col>
					<Select />
				</Col>
			</Row>
			<Row style={{ marginTop: "10px" }}>
				<BootstrapTable keyField="_id" data={moviesData} columns={columns} />
			</Row>
		</Container>
	);
};

export default ShowMovies;
