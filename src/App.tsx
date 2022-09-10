import "./App.css";
import { ImagePlayground } from "./components";

function App() {
  return (
    <div className="App">
      <main className="app-wrapper">
        <section className="explanation" id="panchromatic-history">
          <p>
            Today's black-and-white photos process colours using what we call
            panchromatic mode. Each primary colour of light is treated with the
            same weight, back in the old days, this was not the case!
          </p>
          <p>
            You can try to emulate what it looks like when we give different
            weights to different colours by uploading an image and playing with
            sliders.
          </p>
        </section>
        <section>
          <ImagePlayground />
        </section>
      </main>
    </div>
  );
}

export default App;
