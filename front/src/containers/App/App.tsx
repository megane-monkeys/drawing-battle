import React from 'react';
import {Provider} from 'react-redux';
import store from "../../modules/createStore";
import Canvas from "../Canvas/Canvas";
import Header from "../Header/Header";
import Footer from "../../components/Footer/Footer";

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <div className="App">
            <Header />
            <Canvas />
            <Footer />
        </div>
      </Provider>
  );
};

export default App;

