import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import Select from "react-select";
import utils from "../utils";

const { addMovieToDb, updateMovieToDb } = utils;

const AddMovie = ({ locationOptions, reloadMovies, row }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    movie_name: "",
    cast_name: "",
    language: "",
    genre: "",
    locations: [],
  });

  useEffect(() => {
    if (row) {
      let locations = row.locations.map((item) => item._id);
      setData({ ...row, locations });
    }
  }, [row]);

  const [error, setError] = useState("");

  const handleAddMovieClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const languageOptions = () => {
    return ["ENGLISH", "HINDI", "TAMIL"].map((item) => {
      return { value: item, label: item };
    });
  };

  const genreOptions = () => {
    return ["ACTION", "ADVENTURE", "COMEDY"].map((item) => {
      return { value: item, label: item };
    });
  };

  const handleChange = (e, select) => {
    // console.log(e, select);
    let name = "",
      value = "";
    if (select) {
      name = select.name;
      //   console.log(e.length);
      const tempValue = e;
      if (tempValue.length || tempValue.length === 0) {
        value = tempValue.map((item) => item.value);
      } else {
        value = tempValue.value;
      }
    } else {
      name = e.target.name;
      value = e.target.value;
    }

    // console.log(name, value);

    setData({ ...data, [name]: value });
  };

  const handleAdd = async () => {
    const { cast_name, genre, language, locations, movie_name } = data;

    if (
      cast_name === "" ||
      genre === "" ||
      language === "" ||
      movie_name === ""
    ) {
      setError("Please Check Data");
      return;
    }

    if (locations.length === 0) {
      setError("Please Add Locations");
      return;
    }

    try {
      const { status, error } = await addMovieToDb(data);

      if (status === "Success") {
        reloadMovies();
        setShowModal(false);
      } else {
        setError(error);
      }
    } catch (error) {
      console.log(error);
      setError("Error Adding Movie");
    }
  };

  const handleUpdate = async () => {
    const { cast_name, genre, language, locations, movie_name } = data;

    if (
      cast_name === "" ||
      genre === "" ||
      language === "" ||
      movie_name === ""
    ) {
      setError("Please Check Data");
      return;
    }

    if (locations.length === 0) {
      setError("Please Add Locations");
      return;
    }

    try {
      const { status, error } = await updateMovieToDb(data);

      if (status === "Success") {
        reloadMovies();
        setShowModal(false);
      } else {
        setError(error);
      }
    } catch (error) {
      console.log(error);
      setError("Error Updating Movie");
    }
  };

  const { cast_name, genre, language, locations, movie_name } = data;

  const getSelectedLocations = locations.map((_id) => {
    return locationOptions.find((item) => item.value === _id);
  });

  return (
    <div>
      <Button onClick={handleAddMovieClick}>
        {row ? "Update Movie" : "Add Movie"}
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <ModalHeader>Add Movie</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Movie Name</Form.Label>
              <Form.Control
                value={movie_name}
                type="text"
                placeholder="Enter Movie Name"
                name="movie_name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cast</Form.Label>
              <Form.Control
                value={cast_name}
                type="text"
                placeholder="Enter Cast Names comma seperated"
                name="cast_name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Select
                value={{ value: language, label: language }}
                options={languageOptions()}
                name="language"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Genre Name</Form.Label>
              <Select
                value={{ value: genre, label: genre }}
                options={genreOptions()}
                name="genre"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Locations</Form.Label>
              <Select
                isMulti
                value={getSelectedLocations}
                options={locationOptions}
                name="locations"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          {error !== "" && <Alert variant="danger">{error}</Alert>}
        </ModalBody>
        <ModalFooter>
          {row ? (
            <Button variant="warning" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button variant="success" onClick={handleAdd}>
              Add
            </Button>
          )}
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddMovie;
