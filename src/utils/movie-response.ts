import axios from "axios";
export const getApiResponse = async (url: string) => {
  try {
    const fetch_url = `${process.env.MOVIEDB_URL}${url}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.MOVIE_DB_ACCESS_TOKEN}`,
      },
    };

    const res = await axios(fetch_url, options);

    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
