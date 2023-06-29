import React, {useState, useEffect} from "react"
import {Card, Button} from "react-bootstrap";
import {useContractKit} from "@celo-tools/use-contractkit";
import {getDomain, getConnectedAddressDomain, mintToken, getAllregisteredDomains, approve, isDomainRegistered} from "../utils/counter";
import Loader from "./ui/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import{ NotificationInfo, NotificationSuccess, NotificationError } from "./ui/Notifications"
import { BiCalendarEdit, BiBookReader, BiLandscape, BiDollarCircle, BiSort} from "react-icons/bi";
import "../App.css"
let aboutImage = require("../images/img/about-img.jpg");
let whyUs1 = require("../images/img/why-us-1.jpg"); 
let whyUs2 = require("../images/img/why-us-2.jpg");
let whyUs3 = require("../images/img/why-us-3.jpg");


const Counter = ({counterContract, tokenContract}) => {
    const [loading, setLoading] = useState(false);
   // const [message, setMessage] = useState("");
    const [domainName, setdomainName] = useState("")
    const [userAddress, setUseraddress] = useState("");
    const [allDomain, setallDomain] = useState([]); //alldomain fetch
    const {performActions} = useContractKit();

    useEffect(() => {
        try {
            if (counterContract) {
                // updateCount()
                fetchDomain()
                fetchAllDomain()
            }
        } catch (error) {
            console.log({error});
        }
    }, [counterContract]);


    const handleSubmit = (event) => {
        event.preventDefault();
        //setMessage(`${domainName}`);
        registerfastDomain()
      };

      const getDomainSubmit = (event) => {
        event.preventDefault();
        getdomain(counterContract, userAddress)
      };
    
      const updateInput =() => {
        setdomainName("");
        // setnftId("");
        // setReceiver("");
        // settotalID("");
      }

      const registerFastDomain = async (counterContract, performActions, domainName) => {
        try {
            await performActions(async (kit) => {
                console.log("registerFastDomain", domainName)
                const {defaultAccount} = kit;
                await counterContract.methods.registerFastDomain(domainName).send({from: defaultAccount});

                toast(<NotificationSuccess text={<p>{domainName} registered successfully &#127881;</p> } />); 
            });
        } catch (e) {
          toast(<NotificationError text={<div> Insufficient Token <Button className="m-2" variant="dark" size="lg" onClick={mintFastToken}>
          Mint Token
          </Button></div> 
 } />);
            console.log({e});
        }
    };

    const registerfastDomain = async () => {
        try {
            setLoading(true); 
           await isDomainRegistered(domainName)
            // if(value == true){
              await approve(tokenContract, performActions);
              await registerFastDomain(counterContract, performActions, domainName) 
            // }

        } catch (e) {
            toast(<NotificationError text={ 
            <Button className="m-2" variant="dark" size="lg" onClick={mintFastToken}>
            Mint Token
            </Button> } />);
            //document.querySelector('.error-message').style.visibility = 'visible';
            console.log("error", e)
        } finally {
            setLoading(false)
            updateInput()
            fetchAllDomain()
        }
    };

    const fetchDomain = async () => {
        try {
            setLoading(true)
          await getConnectedAddressDomain(counterContract, performActions)
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    const fetchAllDomain = async () => {
        try {

            setLoading(true)
            const value = await getAllregisteredDomains(counterContract)
            console.log("value ",value)
            setallDomain(value)
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    const getdomain = async () => {
      try {

          setLoading(true)
          const value = await getDomain(counterContract, domainName)
          console.log("value ",value)
      } catch (e) {
          console.log({e})
      } finally {
          setLoading(false)
      }
  };


    const mintFastToken = async () => {
        try {
            setLoading(true)
            await mintToken(counterContract, performActions)
            console.log("Token Minted Successfully");
            toast(<NotificationSuccess text="Token Minted Succesfully...." />); 

        } catch (e) {
          toast(<NotificationError text="OOps, Already Minted." />);
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    

    return (  
                <div>
                {!loading
                    ?
                    <div >
                        

        {/* ======= Hero Section ======= */}
        <section id="hero">
          <div className="hero-container">
            <h1>Welcome to FastDomain</h1>
            <h2>Register your domain</h2>

            <form onSubmit={handleSubmit} className="email-form">
              <div className="row no-gutters">
                <div className="col-md-6 form-group pr-md-1">
                  <input type="text" id="domainName" name="name" className="form-control" value={domainName} placeholder="Domain Name" required onChange={(event) => setdomainName(event.target.value)}/>
                </div>
                <div></div>
              </div>
              <div className="text-center"><button type="submit" >Submit!</button></div>
            </form>

          </div>

        </section>{/* #hero */}
        <main id="main">
          {/* ======= About Section ======= */}
          <section id="about" className="about">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <img src={aboutImage.default} className="img-fluid" alt="about" />
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0">
                <div className="section-title">
                    <h2>Most Recent Domain</h2>
                </div>
                  <p className="fst-italic display-6" >
                    {allDomain.map((element, index) => (
                      <p key={index}>{element}</p>
                    ))}

                  </p>
                </div>
              </div>
            </div>
          </section>{/* End About Section */}
          {/* ======= Why Us Section ======= */}

          <section id="why-us" className="why-us section-bg">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div className="card">
                    <img src={whyUs1.default} className="card-img-top" alt="..." />
                    <div className="card-icon">
                      <i><BiBookReader /> </i>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title"><a href>Our Mission</a></h5>
                      <p className="card-text"> Our mission is to simplify blockchain transactions by providing a user-friendly Naming Service (FastDomain) app for CELO blockchain. We aim to enhance accessibility and ease of use for users, enabling them to interact with the decentralized web seamlessly.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div className="card">
                    <img src={whyUs2.default} className="card-img-top" alt="..." />
                    <div className="card-icon">
                      <i> <BiCalendarEdit /> </i>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title"><a href>Our Plan</a></h5>
                      <p className="card-text"> Our plan involves developing a robust Naming Service app that allows users to register and manage their Celo domain names effortlessly. We will prioritize creating an intuitive and secure interface that integrates seamlessly with existing Celo wallets and dApp browsers. Additionally, we will continuously enhance our app with new features and updates to ensure an exceptional user experience. </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div className="card">
                    <img src={whyUs3.default} className="card-img-top" alt="..." />
                    <div className="card-icon">
                      <i> <BiLandscape /> </i>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title"><a href>Our Vision</a></h5>
                      <p className="card-text"> Our vision is to empower individuals and businesses by enabling them to have personalized and easily recognizable blockchain identities through our FastDomain app. We strive to foster widespread adoption of Naming Service and contribute to the growth of the decentralized web ecosystem. Ultimately, we envision a future where blockchain addresses are replaced by human-readable names, making cryptocurrency transactions more accessible and user-friendly for everyone </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>{/* End Why Us Section */}
      
          {/* ======= Mint Token Section ======= */}
          <section id="contact" className="contact section-bg">
            <div className="container">
              <div className="section-title">
                <h2>Mint Token</h2>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-3 col-md-5 mb-2 mb-md-0">
                  <div className="info txt">
                      <div className="card-icon">
                      <i><BiDollarCircle/> </i>
                    </div>
                      <p className="txt">Mint Fast Token for Free and register name </p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-7">
                  <form className="email-form">
                    <div className="form-group">
                    <div className="text-center mt-2">
                    <button type="submit"  onClick={mintFastToken}>
                        Mint Token
                  </button>
                  </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>{/* End mint Token Section */}


                    {/* ======= Reassign Domain Section ======= */}
          <section id="contact" className="contact section-bg">
            <div className="container">
              <div className="section-title">
                <h2>Reassign Domain</h2>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-3 col-md-5 mb-2 mb-md-0">
                  <div className="info txt">
                  <div className="card-icon">
                      <i><BiSort/> </i>
                    </div>
                      <p className="txt">Do you want to reassign your domain name?</p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-7">
                  <form className="email-form">
                    <div className="form-group mt-1">
                      <input type="text" className="form-control" name="subject" id="subject" placeholder="New Domain name" required />
                    </div>
                    <div className="text-center mt-2">
                      <button type="submit">Submit</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </section>{/* END reassign Domain Section */}

           {/* ======= Get Domain Section ======= */}
          <section id="contact" className="contact section-bg">
            <div className="container">
              <div className="section-title">
                <h2>Get Domain name</h2>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-3 col-md-5 mb-2 mb-md-0">
                  <div className="info txt">
                  <div className="card-icon">
                      <i><BiSort/> </i>
                    </div>
                      <p className="txt">Get Domain name ass0ciated with an address</p>
                    </div>
                </div>
                <div className="col-lg-5 col-md-7">
                <form onSubmit={getDomainSubmit} className="email-form">
              <div className="row no-gutters">
                <div className="col-md-6 form-group pr-md-1">
                  <input type="text" id="userAddress" name="name" className="form-control" value={userAddress} placeholder="User Address" required onChange={(event) => setUseraddress(event.target.value)}/>
                </div>
                <div></div>
              </div>
              <div className="text-center"><button type="submit" >Submit!</button></div>
            </form>
                </div>
              </div>
            </div>
          </section>{/* END Get Domain Section */}

          {/* <form onSubmit={handleSubmit} className="email-form">
              <div className="row no-gutters">
                <div className="col-md-6 form-group pr-md-1">
                  <input type="text" id="domainName" name="name" className="form-control" value={domainName} placeholder="Domain Name" required onChange={(event) => setdomainName(event.target.value)}/>
                </div>
                <div></div>
              </div>
              <div className="text-center"><button type="submit" >Submit!</button></div>
            </form> */}



        </main>{/* End #main */}

        {/* ======= Footer ======= */}
        <footer id="footer">
          <div className="container">
            <div className="copyright">
              © Copyright <strong><span>FastDomain</span></strong>. All Rights Reserved
            </div>
            {/* <div className="credits">
              Designed by <a href="https://github.com/Ultra-Tech-code">Ultra-tech</a>
            </div> */}
          </div>
        </footer>{/* End #footer */}

      </div>
                    :
                    <Loader/>
                }
                </div>
    );
};

export default Counter;
