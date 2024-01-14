import logo from "../logo.png";
import { Button } from "react-bootstrap";

const Cover = ({ connect }) => {
  const connectWallet = async () => {
    try {
      await connect();
    } catch (e) {
      console.log({ e });
    }
  };
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Fast Domain Dapp</p>
      <Button variant="primary" onClick={connectWallet}>
        Connect Wallet
      </Button>
    </>
  );
};

export default Cover;
