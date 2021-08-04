import * as React from "react";
import "./App.css";
import Sketch from "react-p5";
import { DrawRect } from "./DrawRect";
function insertPhotoView(input) {
  let photoView = document.querySelector(".photo-view");
  let photoWrap = document.querySelector(".photo-wrap");
  let label = document.createElement("label");
  label.classList.add("input-upload-label");
  label.textContent = "上傳圖片";
  input.classList.add("input-upload");
  // input.value= '上傳圖片'

  label.insertBefore(input, photoView.nextSibling);
  photoWrap.insertBefore(label, photoView.nextSibling);
}

function App() {
  let canvasWidth = 640;
  let canvasHeight = 320;
  let img, input, cnv;

  const [rectCoordinates, setRectCoordinates] = React.useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const setup = (p5, canvasParentRef) => {
    let DrawRectClass = new DrawRect(p5);
    cnv = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    input = p5.createFileInput((file) => handleFile(file, p5));
    insertPhotoView(input.elt);

    cnv.mousePressed((event) => {
      console.log("mousePressed");
      DrawRectClass.update({ x1: p5.mouseX, y1: p5.mouseY });
    });
    cnv.mouseClicked((event) => {
      console.log("mouseClicked");
      DrawRectClass.display();
      let { x1, y1, x2, y2 } = DrawRectClass.coordinate;

      setRectCoordinates((prev) =>
        prev.map((v, i) => {
          // 左上
          if (i === 0) {
            v = { x: x1, y: y1 };
          }
          // 右上
          if (i === 1) {
            v = { x: x2, y: y1 };
          }
          // 左下
          if (i === 2) {
            v = { x: x1, y: y2 };
          }
          // 右下
          if (i === 3) {
            v = { x: x2, y: y2 };
          }
          return v;
        })
      );
    });
  };

  const draw = (p5) => {
    let DrawRectClass = new DrawRect(p5);
    if (img) {
      let width = (img.width * canvasHeight) / img.height;
      let x = (canvasWidth - width) / 2;
      p5.image(img, x, 0, width, canvasHeight);
    }
    if (p5.mouseIsPressed) {
      // console.log("mouseIsPressed");
      DrawRectClass.update({ x2: p5.mouseX, y2: p5.mouseY });
    }
  };

  function handleFile(file, p5) {
    if (file.type === "image") {
      img = p5.createImg(file.data);
      img.hide();
    }
  }

  function handleExportJSON() {
    alert(JSON.stringify({ rectCoordinates }));
  }

  return (
    <div className="App">
      <div className="layoutBox">
        <div className="left">
          <div className="photo-wrap">
            <h1 className="mb-20 text-align-center">標記系統</h1>
            <div className="photo-view">
              <Sketch setup={setup} draw={draw} />
            </div>
          </div>
        </div>
        <div className="right">
          <pre>
            <code style={{ color: "#fff" }}>
              {`(${rectCoordinates[0].x}, ${rectCoordinates[0].y})`},
              {`(${rectCoordinates[1].x}, ${rectCoordinates[1].y})`}
              <br />
              {`(${rectCoordinates[2].x}, ${rectCoordinates[2].y})`},
              {`(${rectCoordinates[3].x}, ${rectCoordinates[3].y})`}
            </code>
          </pre>

          <button onClick={handleExportJSON}>輸出 JSON</button>
        </div>
      </div>
    </div>
  );
}

export default App;
