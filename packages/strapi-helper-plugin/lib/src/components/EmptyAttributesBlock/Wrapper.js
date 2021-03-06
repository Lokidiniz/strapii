import styled from 'styled-components';

const Wrapper = styled.div`
  height: 22.1rem;
  margin-top: -0.1rem;
  padding-top: 5.8rem;
  background-color: #ffffff;
  background-repeat: repeat;
  text-align: center;
  font-size: 1.4rem;
  font-family: Lato;
  box-shadow: 2px 2px 4px #e3e9f3;
  .title {
    margin-bottom: 1.8rem;
    font-size: 1.8rem;
    line-height: 1.8rem;
    font-weight: bold;
  }
  .description {
    color: #333740;
  }
  .buttonContainer {
    margin-top: 4.6rem;
    > button {
      padding-right: 1.5rem;
      font-size: 1.3rem;
      > i,
      > svg {
        margin-right: 1rem !important;
      }
    }
  }
`;

export default Wrapper;
