import React from "react";
import { connect } from "react-redux";
import { getMovieDetail, reset } from "../../actions/index";

import "./Movie.css";

function mapStateToProps(state) {
  return {
    movies: state.movieDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMovieDetail: (id) => dispatch(getMovieDetail(id)),
    reset: () => dispatch(reset())
  };
}
class Movie extends React.Component {
  componentDidMount() {
    const idPelicula = this.props.match.params.id;
    this.props.getMovieDetail(idPelicula);
  }

  componentWillUnmount() {
    this.props.reset()
  }

  render() {
    return <div className="movie-detail">
        <h1>Detalle de la peli: </h1>
        <h3>{this.props.movies.Title}</h3>
        <img src={this.props.movies.Poster} alt={this.props.movies.Title} />
        <h3>Year: {this.props.movies.Year}</h3>
        <h3>Gender: {this.props.movies.Gender}</h3>
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
