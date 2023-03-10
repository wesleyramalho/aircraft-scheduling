import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`;

export const Line = styled.div`
  border-bottom: 2px dashed black;
  flex-grow: 1;
  margin: 0 10px;
  width: 200px;
`;
export const SvgContainer = styled.div`
  position: absolute;
  left: 35%;
`;
