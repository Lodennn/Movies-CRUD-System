import classes from "./NewCategory.module.scss";

const NewCategory = () => {
  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log("SUBMITTED");
  };

  return (
    <div className={classes["new-category"]}>
      <form
        onSubmit={submitFormHandler}
        className={classes["new-category__form"]}
      >
        <input
          type="text"
          placeholder="Enter a name"
          className={classes["new-category__input"]}
        />
        <textarea placeholder="Enter a description"></textarea>
        <button type="submit" className="btn btn--submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default NewCategory;
