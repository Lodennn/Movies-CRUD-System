import { FaPlus } from "react-icons/fa";
import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
    >
      <span className={classes["button__icon"]}>{<FaPlus />}</span>
      <span className={classes["button__text"]}>{props.text}</span>
    </button>
  );
};

export default Button;
