import { PageProvider } from "./apiContext/pageContext";
import Header from "./components/header/Header";
import PageController from "./components/page/PageController";

const App = () => {
  return (
    <>
      <PageProvider>
        <Header/>  
        <PageController/>      
      </PageProvider>
    </>
  );
};

export default App;