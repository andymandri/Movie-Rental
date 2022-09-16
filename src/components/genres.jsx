import { getGenres } from "../services/fakeGenreService";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports.js";
import { deleteGenre, getAllGenres } from "../actions/genreAction";

const Genres = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genreReducer.genres);
  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  // const [genres, setGenres] = useState(getGenres());

  // let handleDelete = (genreId) => {
  //   const newGenres = genres.filter((g) => g._id !== genreId);
  //   setGenres(newGenres);
  // };
  console.log(genres);
  return (
    <div>
      <h2>Genres</h2>
      <div className="row">
        <div className="col-3">
          <Link to="/genres/new" className="btn btn-primary btn-sm m-2">
            Add Genre
          </Link>
        </div>
        <div className="col">
          {genres && genres.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>NAME</th>
                </tr>
              </thead>
              <tbody>
                {genres.map((genre) => (
                  <tr key={genre._id}>
                    <td>
                      <NavLink to={`/genres/${genre._id}`}>
                        {genre.name}
                      </NavLink>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        // onClick={() => handleDelete(genre._id)}
                        onClick={() => dispatch(deleteGenre(genre._id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No genres found in the database</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Genres;
