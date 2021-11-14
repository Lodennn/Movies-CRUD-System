import { useState } from "react";
import Wrapper from "../UI/Wrapper";
import classes from "./Categories.module.scss";
import CategoryItem from "./CategoryItem/CategoryItem";
import Data from "../../db/movies-data.json";

const Categories = (props) => {
  // const {categories} =
  const [categories, setCategories] = useState(Data.categories);
  const [activeCategory, setActiveCategory] = useState(0);

  const addActiveCategoryClass = (categoryIndex, e) => {
    console.log("categoryIndex: ", categoryIndex);
    setActiveCategory(categoryIndex);
  };

  return (
    <Wrapper>
      <h2>Movies Data</h2>
      <div className={classes.categories}>
        {categories.map((category, index) => {
          console.log(category);
          return (
            <CategoryItem
              key={category.id}
              category={category}
              activeCategoryClass={
                activeCategory === index ? "show-category" : "hide-category"
              }
              onClick={addActiveCategoryClass.bind(null, index)}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Categories;
