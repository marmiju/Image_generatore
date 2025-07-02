import { PageProvider } from "./apiContext/pageContext";
import Header from "./components/header/Header";
import Page from "./components/page/page.jsx";

const App = () => {
  return (
    <>
      <PageProvider>
        <Header/>
       <Page/>
        
      </PageProvider>
    </>
  );
};

export default App;