import styled from "styled-components";

export const NavStyles = styled.div`
  min-height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  a {
    font-size: 1.5rem;
    text-shadow: 1px 1px 2px black;
    letter-spacing: 4px;
    line-height: 1.6;
    color: #fff;
  }
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    margin-left: 3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    font-size: 1rem;
    padding: 0.25rem;
    cursor: pointer;
  }
  svg {
    font-size: 1.5rem;
    cursor: pointer;
  }
  span {
    background: #ff2626;
    color: white;
    width: 1.3rem;
    height: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 0.75rem;
    position: absolute;
    right: -10%;
    top: -20%;
    pointer-events: none;
  }
`;
