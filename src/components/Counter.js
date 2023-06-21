import React, {useState, useEffect} from "react"
import {Card, Button} from "react-bootstrap";
import {useContractKit} from "@celo-tools/use-contractkit";
import {increaseCount, decreaseCount, getCount, getDomain,registerFastDomain, getConnectedAddressDomain, mintToken, getAllregisteredDomains, approve} from "../utils/counter";
import Loader from "./ui/Loader";
import {NotificationSuccess} from "./ui/Notifications";
import { BiCalendarEdit, BiBookReader, BiLandscape} from "react-icons/bi";
import "../App.css"
let aboutImage = require("../images/img/about-img.jpg");
let whyUs1 = require("../images/img/why-us-1.jpg"); 
let whyUs2 = require("../images/img/why-us-2.jpg");
let whyUs3 = require("../images/img/why-us-3.jpg");

const Counter = ({counterContract, tokenContract}) => {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("");
    const [domainName, setdomainName] = useState("");
    const [allDomain, setallDomain] = useState("");
    const {performActions} = useContractKit();

    useEffect(() => {
        try {
            if (counterContract) {
                updateCount()
                fetchAllDomain()
            }
        } catch (error) {
            console.log({error});
        }
    }, [counterContract, getCount]);


    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(`${domainName}`);
    
      };
    
      const updateInput =() => {
        setdomainName("");
        // setnftId("");
        // setReceiver("");
        // settotalID("");
      }

      
      const approveFunction = async () => {
        try {
            setLoading(true)
            await approve(tokenContract, performActions);

        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }

      }
    
    const increment = async () => {
        try {
            setLoading(true)
            await increaseCount(counterContract, performActions);
            await updateCount()

        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    const decrement = async () => {
        try {
            setLoading(true)
            await decreaseCount(counterContract, performActions);

            await updateCount()
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    const updateCount = async () => {
        try {

            setLoading(true)
            const value = await getCount(counterContract)
            setCount(value)
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };
    const registerFastDomain = async () => {
        try {
            setLoading(true)
            approveFunction()
            const value = await registerFastDomain(counterContract, performActions, domainName)
                console.log("value ",value)
                setCount(value)
                updateInput()
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    const fetchDomain = async () => {
        try {
            setLoading(true)
            const value = await getConnectedAddressDomain(counterContract, performActions)
            if (value === undefined){
                console.log("You don't have a domain yet")
                setCount("You don't have a domain yet")
            } else{
                console.log("value ",value)
                setCount(value)
            }
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }
    };

    const fetchAllDomain = async () => {
        try {

            setLoading(true)
            const value = await getAllregisteredDomains(counterContract, performActions)
            console.log("value ",value)
            setallDomain(value)
            setCount(value)
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
            NotificationSuccess("Token Minted Successfully")

        } catch (e) {
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
                         <div>

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
                {/* <div className="col-md-6 form-group pl-md-1 text-center">
                 <button type="submit">Notify me!</button>
                </div> */}
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">Your notification request was sent. Thank you!</div>
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
                  <img src={aboutImage.default} className="img-fluid" alt="about image" />
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0">
                  <h3>Most Recent Domain</h3>
                  <p className="fst-italic display-6" >
                    {allDomain}

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
          {/* ======= Frequenty Asked Questions Section ======= */}
          {/* ======= Contact Us Section ======= */}
          <section id="contact" className="contact section-bg">
            <div className="container">
              <div className="section-title">
                <h2>Contact Us</h2>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-3 col-md-5 mb-5 mb-md-0">
                  <div className="info">
                    <div className="address">
                      <i className="bx bx-map" />
                      <p>A108 Adam Street<br />New York, NY 535022</p>
                    </div>
                    <div className="email">
                      <i className="bx bx-envelope" />
                      <p>info@example.com</p>
                    </div>
                    <div className="phone">
                      <i className="bx bx-phone-call" />
                      <p>+1 5589 55488 55s</p>
                    </div>
                  </div>
                  <div className="social-links">
                    <a href="#" className="twitter"><i className="bx bxl-twitter" /></a>
                    <a href="#" className="facebook"><i className="bx bxl-facebook" /></a>
                    <a href="#" className="instagram"><i className="bx bxl-instagram" /></a>
                    <a href="#" className="linkedin"><i className="bx bxl-linkedin" /></a>
                  </div>
                </div>
                <div className="col-lg-5 col-md-7">
                  <form action="forms/contact.php" method="post" role="form" className="email-form">
                    <div className="form-group">
                      <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                    </div>
                    <div className="form-group mt-3">
                      <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                    </div>
                    <div className="form-group mt-3">
                      <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                    </div>
                    <div className="form-group mt-3">
                      <textarea className="form-control" name="message" rows={5} placeholder="Message" required defaultValue={""} />
                    </div>
                    <div className="my-3">
                      <div className="loading">Loading</div>
                      <div className="error-message" />
                      <div className="sent-message">Your message has been sent. Thank you!</div>
                    </div>
                    <div className="text-center"><button type="submit">Send Message</button></div>
                  </form>
                </div>
              </div>
            </div>
          </section>{/* End Contact Us Section */}
        </main>{/* End #main */}
        {/* ======= Footer ======= */}
        <footer id="footer">
          <div className="container">
            <div className="copyright">
              © Copyright <strong><span>Siimple</span></strong>. All Rights Reserved
            </div>
            <div className="credits">
              {/* All the links in the footer should remain intact. */}
              {/* You can delete the links only if you purchased the pro version. */}
              {/* Licensing information: https://bootstrapmade.com/license/ */}
              {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/free-bootstrap-landing-page/ */}
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>{/* End #footer */}
        {/* Vendor JS Files */}
        {/* Template Main JS File */}
      </div>
                        <Card.Title>Count: {count}</Card.Title>
                        <Button className="m-2" variant="dark" size="lg" onClick={increment}>
                            Increase Count
                        </Button>

                        <Button className="m-2" variant="dark" size="lg" onClick={fetchDomain}>
                        Fetch Domain
                        </Button>

                        <Button className="m-2" variant="dark" size="lg" onClick={mintFastToken}>
                        Mint Token
                        </Button>


                        <Button className="m-2" variant="dark" size="lg" onClick={fetchAllDomain}>
                        Fetch all Domain
                        </Button>


                        <Button
                            className="m-2"
                            variant="outline-dark"
                            disabled={count < 1}
                            size="lg"
                            onClick={decrement}
                        >
                            Decrease Count
                        </Button>
                    </div>
                    :
                    <Loader/>
                }
                </div>
    );
};

export default Counter;
