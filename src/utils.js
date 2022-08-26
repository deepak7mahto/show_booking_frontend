const { default: axios } = require("axios");

exports.rootServerUrl = "http://localhost:5000";

exports.getLocations = () => {
	console.log("Getting Locations");

	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.get(this.rootServerUrl + "/locations");
			resolve(data);
		} catch (error) {
			console.log({ error });
			reject(error);
		}
	});
};

exports.addMovieToDb = (bodyData) => {
	console.log("Adding Movie");

	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.post(this.rootServerUrl + "/movies", bodyData);
			resolve(data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

exports.loadMovies = () => {
	console.log("Loading Movies");

	return new Promise(async (resolve, reject) => {
		try {
			let { data } = await axios.get(this.rootServerUrl + "/movies");
			resolve(data);
		} catch (error) {
			console.log({ error });
			reject(error);
		}
	});
};
