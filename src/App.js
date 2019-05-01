import React from "react";
import "./App.css";
import Clarifai from "clarifai";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import particles from "./components/ParticlesJson/particlesjson.json";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
const particlesOptions = particles;
const app = new Clarifai.App({
  apiKey: "06ce844135c1448abb5cae021c520b4a"
});
class App extends React.Component {
  state = {
    input: "",
    facesBox: [],
    route: "signin",
    isSignin: false
  };

  onInputChange = event => {
    // console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = data => {
    const facesBounding_box = data.map(face => face.region_info.bounding_box);
    const image = document.getElementById("inputImage");
    const width = image.width;
    const height = image.height;
    const box = [];
    facesBounding_box.forEach(face => {
      box.push({
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height
      });
    });
    this.setState({ facesBox: box });
  };
  onSubmit = () => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.calculateFaceLocation(response.outputs["0"].data.regions)
      )
      .catch(error => console.log(error));
  };

  onRouteChange = page => {
    page === "home"
      ? this.setState({ isSignin: true })
      : this.setState({ isSignin: false });
    this.setState({ route: page });
  };

  render() {
    const { isSignin, input, facesBox, route } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignin={isSignin} />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition imgUrl={input} box={facesBox} />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
