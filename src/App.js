import React from "react";
import "./App.css";
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

class App extends React.Component {
  state = {
    input: "",
    facesBox: [],
    route: "signin",
    isSignin: false,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0
    }
  };

  loadUser = loginUser => {
    const { id, name, email, entries } = loginUser;
    const user = { id, name, email, entries };
    this.setState({ user });
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
    fetch("http://localhost:3001/imageurl", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(faces =>
        this.calculateFaceLocation(faces.outputs["0"].data.regions)
      )
      .then(() => {
        fetch("http://localhost:3001/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(data => data.json())
          .then(entries => {
            const user = Object.assign(this.state.user, { entries });
            this.setState({ user });
          })
          .catch(console.log);
      })
      .catch(error => {
        if (error) alert("Check the URL");
        console.log("Error", error);
      });
  };

  onRouteChange = page => {
    page === "home"
      ? this.setState({ isSignin: true })
      : this.setState({ isSignin: false });
    this.setState({ route: page });
  };

  render() {
    const { isSignin, input, facesBox, route, user } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignin={isSignin} />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank user={user} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition imgUrl={input} box={facesBox} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
