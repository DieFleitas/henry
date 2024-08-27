import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { Link } from 'react-router-dom';
import { removeMovieFavorite } from "../../actions";
import "./Favorites.css";

function mapStateToProps(state) {
  return {
    moviesFav: state.moviesFavourites,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeMovieFavorite: (id) => dispatch(removeMovieFavorite(id)),
  };
}

export class ConnectedList extends Component {
  render() {
    return (
      <div>
        <h2>Películas Favoritas</h2>
        <ul>
          {this.props.moviesFav &&
            this.props.moviesFav.map((movie) => {
              return (
                <li key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <span>{movie.title}</span>
                  </Link>
                  <button
                    onClick={() => this.props.removeMovieFavorite(movie.id)}
                  >
                    X
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
