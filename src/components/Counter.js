import React, {useState, useEffect} from "react"
import {Card, Button} from "react-bootstrap";
import {useContractKit} from "@celo-tools/use-contractkit";
import {increaseCount, decreaseCount, getCount, getDomain,registerFastDomain, getConnectedAddressDomain, mintToken, getAllregisteredDomains, approve} from "../utils/counter";
import Loader from "./ui/Loader";
import {NotificationSuccess} from "./ui/Notifications";

const Counter = ({counterContract, tokenContract}) => {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const {performActions} = useContractKit();

    useEffect(() => {
        try {
            if (counterContract) {
                updateCount()
            }
        } catch (error) {
            console.log({error});
        }
    }, [counterContract, getCount]);

      
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
    const registerFastDomain = async (_domainname) => {
        try {
            setLoading(true)
            approveFunction()
            const value = await registerFastDomain(counterContract, performActions, _domainname)
                console.log("value ",value)
                setCount(value)
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
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Siimple - Bootstrap Landing Page Template</title>
        <meta content name="description" />
        <meta content name="keywords" />
        {/* Favicons */}
        <link href="assets/img/favicon.png" rel="icon" />
        <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon" />
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,600,600i,700,700i" rel="stylesheet" />
        {/* Vendor CSS Files */}
        <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
        {/* Template Main CSS File */}
        <link href="../src/App.css" rel="stylesheet" />
        {/* =======================================================
  * Template Name: Siimple
  * Updated: May 30 2023 with Bootstrap v5.3.0
  * Template URL: https://bootstrapmade.com/free-bootstrap-landing-page/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== */}
        {/* ======= Header ======= */}
        <header id="header">
          <div className="container-fluid">
            <div className="logo">
              <h1><a href="index.html">Siimple</a></h1>
              {/* Uncomment below if you prefer to use an image logo */}
              {/* <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>*/}
            </div>
            <button type="button" className="nav-toggle"><i className="bx bx-menu" /></button>
            <nav className="nav-menu">
              <ul>
                <li className="active"><a href="#header" className="scrollto">Home</a></li>
                <li><a href="#about" className="scrollto">About Us</a></li>
                <li><a href="#why-us" className="scrollto">Why Us</a></li>
                <li className="drop-down"><a href>Drop Down</a>
                  <ul>
                    <li><a href="#">Drop Down 1</a></li>
                    <li className="drop-down"><a href="#">Drop Down 2</a>
                      <ul>
                        <li><a href="#">Deep Drop Down 1</a></li>
                        <li><a href="#">Deep Drop Down 2</a></li>
                        <li><a href="#">Deep Drop Down 3</a></li>
                        <li><a href="#">Deep Drop Down 4</a></li>
                        <li><a href="#">Deep Drop Down 5</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Drop Down 3</a></li>
                    <li><a href="#">Drop Down 4</a></li>
                    <li><a href="#">Drop Down 5</a></li>
                  </ul>
                </li>
                <li><a href="#contact" className="scrollto">Contact Us</a></li>
              </ul>
            </nav>{/* .nav-menu */}
          </div>
        </header>{/* End #header */}
        {/* ======= Hero Section ======= */}
        <section id="hero">
          <div className="hero-container">
            <h1>Welcome to Siimple</h1>
            <h2>Please, fill out the for below to be notified for the latest updates!</h2>
            <form action="forms/notify.php" method="post" role="form" className="php-email-form">
              <div className="row no-gutters">
                <div className="col-md-6 form-group pr-md-1">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                </div>
                <div className="col-md-6 form-group pl-md-1">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">Your notification request was sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit">Notify me!</button></div>
            </form>
          </div>
        </section>{/* #hero */}
        <main id="main">
          {/* ======= About Section ======= */}
          <section id="about" className="about">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <img src="./images/img/about-img.jpg" className="img-fluid" alt="" />
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0">
                  <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.
                  </p>
                  <ul>
                    <li><i className="bx bx-check-double" /> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                    <li><i className="bx bx-check-double" /> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                    <li><i className="bx bx-check-double" /> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
                  </ul>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
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
                    <img src="assets/img/why-us-1.jpg" className="card-img-top" alt="..." />
                    <div className="card-icon">
                      <i className="bx bx-book-reader" />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title"><a href>Our Mission</a></h5>
                      <p className="card-text">Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div className="card">
                    <img src="assets/img/why-us-2.jpg" className="card-img-top" alt="..." />
                    <div className="card-icon">
                      <i className="bx bx-calendar-edit" />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title"><a href>Our Plan</a></h5>
                      <p className="card-text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                  <div className="card">
                    <img src="assets/img/why-us-3.jpg" className="card-img-top" alt="..." />
                    <div className="card-icon">
                      <i className="bx bx-landscape" />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title"><a href>Our Vision</a></h5>
                      <p className="card-text">Nemo enim ipsam voluptatem quia voluptas sit aut odit aut fugit, sed quia magni dolores eos qui ratione voluptatem sequi nesciunt Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet. </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>{/* End Why Us Section */}
          {/* ======= Frequenty Asked Questions Section ======= */}
          <section className="faq">
            <div className="container">
              <div className="section-title">
                <h2>Frequenty Asked Questions</h2>
              </div>
              <ul className="faq-list">
                <li>
                  <a data-bs-toggle="collapse" className="collapsed" data-bs-target="#faq1">Non consectetur a erat nam at lectus urna duis? <i className="bx bx-down-arrow-alt icon-show" /><i className="bx bx-x icon-close" /></a>
                  <div id="faq1" className="collapse" data-bs-parent=".faq-list">
                    <p>
                      Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
                    </p>
                  </div>
                </li>
                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#faq2" className="collapsed">Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque? <i className="bx bx-down-arrow-alt icon-show" /><i className="bx bx-x icon-close" /></a>
                  <div id="faq2" className="collapse" data-bs-parent=".faq-list">
                    <p>
                      Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                    </p>
                  </div>
                </li>
                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#faq3" className="collapsed">Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi? <i className="bx bx-down-arrow-alt icon-show" /><i className="bx bx-x icon-close" /></a>
                  <div id="faq3" className="collapse" data-bs-parent=".faq-list">
                    <p>
                      Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
                    </p>
                  </div>
                </li>
                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#faq4" className="collapsed">Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla? <i className="bx bx-down-arrow-alt icon-show" /><i className="bx bx-x icon-close" /></a>
                  <div id="faq4" className="collapse" data-bs-parent=".faq-list">
                    <p>
                      Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                    </p>
                  </div>
                </li>
                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#faq5" className="collapsed">Tempus quam pellentesque nec nam aliquam sem et tortor consequat? <i className="bx bx-down-arrow-alt icon-show" /><i className="bx bx-x icon-close" /></a>
                  <div id="faq5" className="collapse" data-bs-parent=".faq-list">
                    <p>
                      Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in
                    </p>
                  </div>
                </li>
                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#faq6" className="collapsed">Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i className="bx bx-down-arrow-alt icon-show" /><i className="bx bx-x icon-close" /></a>
                  <div id="faq6" className="collapse" data-bs-parent=".faq-list">
                    <p>
                      Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Nibh tellus molestie nunc non blandit massa enim nec.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>{/* End Frequenty Asked Questions Section */}
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
                  <form action="forms/contact.php" method="post" role="form" className="php-email-form">
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
