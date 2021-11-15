import { Fragment } from "react";
import { useSelector } from "react-redux";
import Categories from "./components/Categories/Categories";
import NewCategory from "./components/NewCategory/NewCategory";
import Wrapper from "./components/UI/Wrapper";
import SnackBar from "./components/UI/Snackbar";

function App() {
  const snackbar = useSelector((state) => state.snackbar);
  return (
    <Fragment>
      <SnackBar type={snackbar.type} message={snackbar.message} />
      <Wrapper>
        <NewCategory />
        <Categories />
      </Wrapper>
    </Fragment>
  );
}

export default App;
