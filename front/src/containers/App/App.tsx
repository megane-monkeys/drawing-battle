import React from 'react';
import {Provider} from 'react-redux';
import store from "../../modules/createStore";
import Canvas from "../Canvas/Canvas";
import Timer from "../Timer/Timer"

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <div className="App">
            <Timer />
            <p>お題 1/1</p>
            <Canvas />
        </div>
      </Provider>
  );
};

export default App;

