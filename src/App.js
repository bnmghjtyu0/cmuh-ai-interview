import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="layoutBox">
        <div className="left">
          <div className="photo-wrap">
            <div className="photo-view"></div>
            <button>上傳圖片</button>
          </div>
        </div>
        <div className="right">
          <pre>
            <code>{JSON.stringify({id:1}, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
