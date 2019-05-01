import React from "react";

const Navigation = ({ onRouteChange, isSignin }) => {
  return isSignin ? (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        className="f3 link dim balck underline pa3 pointer"
        onClick={() => {
          onRouteChange("signin");
        }}
      >
        Sign out
      </p>
    </nav>
  ) : (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        className="f3 link dim balck underline pa3 pointer"
        onClick={() => onRouteChange("signin")}
      >
        Sign in
      </p>
      <p
        className="f3 link dim balck underline pa3 pointer"
        onClick={() => onRouteChange("rigester")}
      >
        Sign Up
      </p>
    </nav>
  );
};

export default Navigation;
