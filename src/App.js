import * as React from "react";
import "./App.css";
import Sketch from "react-p5";

let x = 50;
let y = 50;

function App() {
  let img, input;
  const [obj, setObj] = React.useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    w: 0,
    h: 0,
  });

  const setup = (p5, canvasParentRef) => {
    let cnv = p5.createCanvas(300, 200).parent(canvasParentRef);
    // p5.background(255, 255, 255);
    input = p5.createFileInput((file) => handleFile(file, p5));
    input.position(0, 0);
  };

  const draw = (p5) => {
    if (img) {
      p5.image(img, 0, 0, 200, 200);
    }
    if (p5.mouseIsPressed) {
      console.log(123);
      setObj((prev) => ({
        ...prev,
        w: p5.mouseX - obj.x1,
        h: p5.mouseY - obj.y1,
      }));
    }
  };

  function mouseClicked(p5) {
    p5.rect(obj.x1, obj.y1, obj.w, obj.h);
    setObj((prev) => ({ ...prev, x2: p5.mouseX, y2: p5.mouseY }));
  }

  function mousePressed(p5) {
    setObj((prev) => ({ ...prev, x1: p5.mouseX, y1: p5.mouseY }));
  }
  function handleFile(file, p5) {
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
              <Sketch
                setup={setup}
                draw={draw}
                mouseClicked={mouseClicked}
                mousePressed={mousePressed}
              />
            </div>
          </div>
        </div>
        <div className="right">
          <pre>
            <code style={{ color: "#fff" }}>
              {JSON.stringify({ obj }, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
