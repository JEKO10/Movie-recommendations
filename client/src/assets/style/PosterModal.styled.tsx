import styled from "styled-components";

export const PosterModal = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  visibility: hidden;
  opacity: 0;
  transition: all 500ms ease;

  &.open {
    visibility: visible;
    opacity: 1;
  }

  img {
    position: relative;
    height: 95vh;
    margin-top: 1rem;
    border: 1.5px solid #e1e1ff99;
    border-radius: 5px;
    z-index: 4;
  }

  svg {
    font-size: 2rem;
    position: absolute;
    top: 15px;
    right: 20px;
    color: #e1e1ff99;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
`;