import React from "react";
import styled from "styled-components";
import spinner from "./loader.gif"; // create gif from https://loading.io
const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderImg src={spinner} />
    </LoaderContainer>
  );
};


const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: #fff;
  z-index: 100;
`;
const LoaderImg = styled.img`
  position: absolute;
`;

export default Loader;