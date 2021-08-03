import * as React from "react";
import "./App.css";
import Sketch from "react-p5";

let x = 50;
let y = 50;

function App() {
  let img, input;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(700, 700).parent(canvasParentRef);
    // p5.background(255, 255, 255);
    input = p5.createFileInput((file) => handleFile(file, p5));
    input.position(0, 0);
  };

  const draw = (p5) => {
    if (img) {
      p5.image(img, 0, 0, 200, 200);
    }
  };
  function handleFile(file, p5) {
    console.log(file)
    if (file.type === "image") {
      img = p5.createImg(file.data);
      img.hide();
    }
  }
  return (
    <div className="App">
      <div className="layoutBox">
        <div className="left">
          <div className="photo-wrap">
            <div className="photo-view">
              <Sketch setup={setup} draw={draw} />;
            </div>
          </div>
        </div>
        <div className="right">
          <pre>
            <code>{JSON.stringify({ id: 1 }, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
