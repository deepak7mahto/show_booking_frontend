import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Select from "react-select";
import AddMovie from "./AddMovie";
import MovieLocationDetails from "./MovieLocationDetails";

const ShowMovies = ({ moviesData, reloadMovies, locationOptions }) => {
  // console.log({ moviesData });

  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({
    genre: [],
    language: [],
    location: [],
  });

  useEffect(() => {
    let tempMoviesData = moviesData.filter((item) => {
      const { language, genre, locations } = item;

      let isGenreMatched = selectedFilter.genre.indexOf(genre) !== -1;
      let islanguageMatched = selectedFilter.language.indexOf(language) !== -1;

      let matchedLocation = locations.filter(
        ({ location }) => selectedFilter.location.indexOf(location) !== -1
      );

      if (isGenreMatched || islanguageMatched || matchedLocation.length > 0) {
        return true;
      }

      return false;
    });

    console.log(tempMoviesData);

    setData(tempMoviesData);
  }, [selectedFilter, moviesData]);

  const locationFormatter = (cell) => {
    return <div>{cell.length}</div>;
  };

  const detaiilsFormatter = (cell, row) => {
    return <MovieLocationDetails row={row} />;
  };

  const editMovieFormatter = (cell, row) => {
    return (
      <AddMovie
        reloadMovies={reloadMovies}
        locationOptions={locationOptions}
        row={row}
      />
    );
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
    {
      dataField: "",
      text: "Show Details",
      formatter: detaiilsFormatter,
    },
    {
      dataField: "",
      text: "Edit Movie",
      formatter: editMovieFormatter,
    },
  ];

  const prepareOptions = (type) => {
    let allData = moviesData.map((item) => item[type]);
    let dataSet = new Set(allData);
    let uniqData = Array.from(dataSet);
    return uniqData.map((item) => {
      return { value: item, label: item };
    });
  };

  const onFilterChange = (selected, { name }) => {
    setSelectedFilter({
      ...selectedFilter,
      [name]: selected.map((item) => item.value),
    });
  };

  const onLocationFilterChange = (selected, { name }) => {
    setSelectedFilter({
      ...selectedFilter,
      [name]: selected.map((item) => item.label),
    });
  };

  // console.log({ data });

  return (
    <>
      <Col>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <Form.Label>Language Filter</Form.Label>
            <Select
              isMulti
              name="language"
              options={prepareOptions("language")}
              onChange={onFilterChange}
            />
          </Col>
          <Col>
            <Form.Label>Location Filter</Form.Label>
            <Select
              name="location"
              isMulti
              options={locationOptions}
              onChange={onLocationFilterChange}
            />
          </Col>
          <Col>
            <Form.Label>Genre Filter</Form.Label>
            <Select
              isMulti
              name="genre"
              options={prepareOptions("genre")}
              onChange={onFilterChange}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <BootstrapTable
            keyField="_id"
            data={data.length === 0 ? moviesData : data}
            columns={columns}
          />
        </Row>
      </Col>
    </>
  );
};

export default ShowMovies;
