import React from 'react';
import {Provider} from 'react-redux';
import store from "../../modules/createStore";
import Canvas from "../Canvas/Canvas";
import Timer from "../Timer/Timer"
import Header from "../Header/Header";

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <div className="App">
            <Header />
            <Canvas />
        </div>
      </Provider>
  );
};

export default App;

