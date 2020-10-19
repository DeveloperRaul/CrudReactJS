import React, { useState } from 'react';
import shortId from 'shortid';

function App() {

  const [movie, setMovie] = useState('');
  const [movies, setMovies] = useState([]);
  const [modeEdit, setModeEdit] = useState(false);
  const [idEdit, setIdEdit] = useState('');
  const [error, setError] = useState(null);

  const addMovie = (e) => {
    e.preventDefault()

    if (!movie.trim()) {
      console.warn("La Ing Sonia te hubiera reprobado por permitir registros nulos o vacíos");
      setError("Ing. Sonia: -Por favor no seas tonto, ingresa una Película");
      return
    }

    console.log('Processing Movie... ' + movie)

    setMovies([
      ...movies,
      {id: shortId.generate(), movie: movie}
    ]);

    e.target.reset();
    setMovie("");
    setError(null);
  }

  const deleteMovie = id => {
    const moviesFilter = movies.filter( item => item.id !== id);
    setMovies(moviesFilter);
    setModeEdit(false);
    setMovie('');
    setIdEdit('');
    console.log("The movie was successfully removed!");
  }

  const activeModeEdit = (item) => {
    setModeEdit(true);
    setMovie(item.movie);
    setIdEdit(item.id);
  }

  const saveChanges = e => {
    e.preventDefault()

    if (!movie.trim()) {
      console.warn("La Ing Sonia te hubiera reprobado por permitir registros nulos o vacíos");
      setError("Ing. Sonia: -Por favor no seas tonto, ingresa una Película");
      return
    }

    console.log('Processing for Edit Movie... ' + movie)

    const moviesUpdated = movies.map(item => item.id === idEdit ? {id: idEdit, movie: movie} : item);
    setMovies(moviesUpdated);
    setModeEdit(false);
    setMovie('');
    setIdEdit('');
    setError(null);
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">My Movies Reloaded</h1>
      <hr/>
      <div className="row">
        <div className="col-md-8">
          <h4 className="text-center">Movies</h4>
          <ul className="list-group">
            {
              movies.length === 0 ? (
                <li className="list-group-item">
                  La Ing. Sonia estaría orgullos@ de ti, si registraras tu Película.
                </li>
              ) : (
                movies.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <span className="lead">{item.movie}</span>
                    <button onClick={ () => deleteMovie(item.id) } className="btn btn-danger btn-sm float-right mx-2">
                        Eliminar
                      </button>
  
                    <button 
                      className="btn btn-warning btn-sm float-right"
                      onClick={ () => activeModeEdit(item) }>
                        Editar
                    </button>
                  </li>
                ))
              ) 
            }
          </ul>
        </div>
        <div className="col-md-4">
          <h4 className="text-center">
            {
              modeEdit ? 'Edit Movie' : 'Register Movie'
            }
            </h4>
          <form onSubmit={ modeEdit ? saveChanges : addMovie }>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input 
              type = "text" 
              className = "form-control mb-2"
              placeholder = "Describe tu vida con un nombre de Película"
              onChange = { e => setMovie(e.target.value)}
              value={movie}
            />
            {
              modeEdit ? (
                <button type="submit" className="btn btn-warning btn-block">Edit</button>
              ) : (
                <button type="submit" className="btn btn-primary btn-block">Register</button>
              )
            }
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
