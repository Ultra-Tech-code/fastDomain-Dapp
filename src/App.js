import React from "react";
import { Container, Nav } from "react-bootstrap";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Notification } from "./components/ui/Notifications";
import Wallet from "./components/Wallet";
import Cover from "./components/Cover";
import Counter from "./components/Counter";
import { useBalance, useFastDomainContr, useTokenContract } from "./hooks";
import "./App.css";

const App = function AppWrapper() {
  const { address, destroy, connect } = useContractKit();
  const { balance } = useBalance();
  const counterContract = useFastDomainContract();
  const tokenContract = useTokenContract();

  return (
    <>
      <Notification />
      {address ? (
        <Container fluid={true} className="p-0">
          <Nav className="justify-content-end pt-3 pb-5 mb-5">
            <Nav.Item>
              {/*display user wallet*/}
              <Wallet
                address={address}
                amount={balance.CELO}
                symbol="CELO"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          {/* display cover */}
          <main>
            <Counter counterContract={counterContract} tokenContract={tokenContract}/>
          </main>
        </Container>
      ) : (
        // display cover if user is not connected
        <div className="App">
          <header className="App-header">
            <Cover connect={connect} />
          </header>
        </div>
      )}
    </>
  );
};

export default App;
