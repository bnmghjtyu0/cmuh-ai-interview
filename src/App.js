import * as React from "react";
import "./App.css";
import Sketch from "react-p5";

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
  let recordRectCoordinate = { x1: 0, y1: 0, x2: 0, y2: 0, w: 0, h: 0 };

  const [rectCoordinates, setRectCoordinates] = React.useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const setup = (p5, canvasParentRef) => {
    cnv = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.stroke(0);
    input = p5.createFileInput((file) => handleFile(file, p5));
    insertPhotoView(input.elt);

    // p5.noLoop();
    cnv.mousePressed((event) => {
      console.log("mousePressed");
      recordRectCoordinate = {
        ...recordRectCoordinate,
        x1: p5.mouseX,
        y1: p5.mouseY,
      };
    });
    cnv.mouseClicked((event) => {
      console.log("mouseClicked");
      // p5.clear();
      recordRectCoordinate = {
        ...recordRectCoordinate,
        x2: p5.mouseX,
        y2: p5.mouseY,
        w: p5.mouseX - recordRectCoordinate.x1,
        h: p5.mouseY - recordRectCoordinate.y1,
      };
      p5.noFill();
      p5.stroke(255, 0, 0);
      p5.rect(
        recordRectCoordinate.x1,
        recordRectCoordinate.y1,
        recordRectCoordinate.w,
        recordRectCoordinate.h
      );

      setRectCoordinates((prev) =>
        prev.map((v, i) => {
          // 左上
          if (i === 0) {
            v = { x: recordRectCoordinate.x1, y: recordRectCoordinate.y1 };
          }
          // 右上
          if (i === 1) {
            v = { x: recordRectCoordinate.x2, y: recordRectCoordinate.y1 };
          }
          // 左下
          if (i === 2) {
            v = { x: recordRectCoordinate.x1, y: recordRectCoordinate.y2 };
          }
          // 右下
          if (i === 3) {
            v = { x: recordRectCoordinate.x2, y: recordRectCoordinate.y2 };
          }
          return v;
        })
      );
    });
  };

  const draw = (p5) => {
    if (img) {
      let width = (img.width * canvasHeight) / img.height;

      let x = (canvasWidth - width) / 2;
      p5.image(img, x, 0, width, canvasHeight);
    }
    if (p5.mouseIsPressed) {
      console.log("mouseIsPressed");
      recordRectCoordinate = {
        ...recordRectCoordinate,
        x2: p5.mouseX,
        y2: p5.mouseY,
      };
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

  function touchMoved(p5) {
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    return false;
  }

  return (
    <div className="App">
      <div className="layoutBox">
        <div className="left">
          <div className="photo-wrap">
            <h1 className="mb-20 text-align-center">標記系統</h1>
            <div className="photo-view">
              <Sketch setup={setup} draw={draw} touchMoved={touchMoved} />
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
