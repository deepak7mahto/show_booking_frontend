const { default: axios } = require("axios");

const rootServerUrl = "https://show-booking-api.herokuapp.com";

const getLocations = () => {
  console.log("Getting Locations");

  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get(rootServerUrl + "/locations");
      resolve(data);
    } catch (error) {
      console.log({ error });
      reject(error);
    }
  });
};

const addMovieToDb = (bodyData) => {
  console.log("Adding Movie");

  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.post(rootServerUrl + "/movies", bodyData);
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const updateMovieToDb = (bodyData) => {
  console.log("Updating Movie");

  return new Promise(async (resolve, reject) => {
    try {
      const { _id } = bodyData;
      let { data } = await axios.post(
        rootServerUrl + "/movies/" + _id,
        bodyData
      );
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const loadMovies = () => {
  console.log("Loading Movies");

  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios.get(rootServerUrl + "/movies");
      resolve(data);
    } catch (error) {
      console.log({ error });
      reject(error);
    }
  });
};

const utils = {
  addMovieToDb,
  getLocations,
  loadMovies,
  updateMovieToDb,
};

export default utils;
