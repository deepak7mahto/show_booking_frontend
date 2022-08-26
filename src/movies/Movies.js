import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { getLocations, loadMovies } from "../utils";
import AddMovie from "./AddMovie";
import ShowMovies from "./ShowMovies";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    reloadMovies();
    getLocations().then((locations) => {
      const tempLocOptions = locations.map((item) => {
        const { location, _id } = item;
        return { value: _id, label: location };
      });

      setLocationOptions(tempLocOptions);
    });
  }, []);

  const reloadMovies = () => {
    loadMovies().then((data) => {
      setMoviesData(data);
    });
  };

  return (
    <Container fluid>
      <div className="display-1">Movies</div>
      <Row style={{ marginTop: "10px" }}>
        <AddMovie
          reloadMovies={reloadMovies}
          locationOptions={locationOptions}
        />
      </Row>
      <Row>
        <ShowMovies
          moviesData={moviesData}
          reloadMovies={reloadMovies}
          locationOptions={locationOptions}
        />
      </Row>
    </Container>
  );
};

export default Movies;
