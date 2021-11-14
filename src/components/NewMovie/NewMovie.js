import classes from "./NewMovie.module.scss";

const NewMovie = () => {
  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log("SUBMITTED");
  };

  return (
    <div className={classes["new-movie"]}>
      <form onSubmit={submitFormHandler} className={classes["new-movie__form"]}>
        <input
          type="text"
          placeholder="Enter a name"
          className={classes["new-movie__input"]}
        />
        <textarea placeholder="Enter a description"></textarea>
        <button type="submit" className="btn btn--submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default NewMovie;
