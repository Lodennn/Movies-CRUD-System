import Categories from "./components/Categories/Categories";
import NewCategory from "./components/NewCategory/NewCategory";
import Wrapper from "./components/UI/Wrapper";

function App() {
  return (
    <Wrapper>
      <NewCategory />
      <Categories />
    </Wrapper>
  );
}

export default App;
