import { useState } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../UI/Wrapper";
import CategoryItem from "./CategoryItem/CategoryItem";
import classes from "./Categories.module.scss";

const Categories = (props) => {
  const { categories } = useSelector((state) => state.categories);

  const [activeCategory, setActiveCategory] = useState(0);

  const addActiveCategoryClass = (categoryIndex, e) => {
    if (activeCategory === categoryIndex) {
      setActiveCategory(-1);
    } else {
      setActiveCategory(categoryIndex);
    }
  };

  return (
    <div className="mt-xl wrapper__special">
      <span className="wrapper__special--main-element"></span>
      <Wrapper>
        <h2 className="title">Categories</h2>
        <div className={classes.categories}>
          {categories.map((category, index) => {
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
    </div>
  );
};

export default Categories;
