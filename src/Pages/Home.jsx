import React from "react";
import "./styles/home.css";
import justice from "../Assets/justicelogo.jpg";
import india from "../Assets/indianlogo.jpg";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div>
      <nav id="desktop-nav">
     <div className="indianlogo01">
     <img className="indianlogo02"  src={india} alt="" />
     </div>
      
        <div class="logo">
          <p>சென்னை மாநகர நீதிமன்றங்கள்</p>
          <p>चेन्नई नगर न्यायालय</p>
          <h3>Chennai City Courts </h3>

          <p>e-Courts Mission Mode Project</p>
        </div>

        <div>
          <ul class="nav-links">
            <li>
              <Link to='/judge/login'>Magistrate Login</Link>
            </li>
            <li>
              <Link to='/lawyer/login' >Advocate Login</Link>
            </li>
            <li>
            <Link to='/user/login' >Defendant Login</Link>
            </li>
            <li>
            <Link to='/police/login' >Station Login</Link>
            </li>
          </ul>
        </div>
      </nav>

      <hr />
      <div>
        <img className="justiceimage" src={justice} alt="" />
        <div className="text-box">
          <h3>"No one is above the law and no one is below it"</h3>
        </div>
      </div>
      <div className="information">
        <div className="info-container">
          <div className="info-box1">
            <p>District & Taluka Court Complexes</p>
            <h2>
              <span>3247</span>
            </h2>
          </div>

          <div className="info-box2">
            <p>DC Pending Cases</p>
            <h2>
              <span>32.9 M</span>
            </h2>
          </div>

          <div className="info-box3">
            <p>DC Disposed Cases (Last Month)</p>
            <h2>
              <span>295.47 K</span>
            </h2>
          </div>

          <div className="info-box4">
            <p>DC Cases Listed Today</p>
            <h2>
              <span>786.38 K</span>
            </h2>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="main-content">
          <h2 className="aboutsection">About District Court</h2>
          <p>
            The City of Chennai, also known as Madras earlier times, is the
            Capital of the state of Tamil Nadu. It is situated at the Coromandel
            Coast off the Bay of Bengal. Spread over an area of about 200 sqkm
            and still growing, it is the biggest industrial, commercial centre,
            and a major cultural, economic and educational centre in South
            India. It is today India's fourth largest metropolis with an
            estimated population of 4.68 million (2011). The city is famous for
            its sandy beaches- the 12 km long Marina Beach being second longest
            beaches in the world, parks and historic landmarks.
          </p>

          <h2 className="aboutsection">Culture and Tradition</h2>
          <p>
            Chennai has a rich culture and heritage that goes back to thousands
            of years. The city has retained its traditional Tamil roots,
            boasting of its ancient culture and heritage and maintaining it the
            way it was since ancient times, while simultaneously acquiring a
            modern and cosmopolitan character. The people of Chennai have a
            special interest in music, dance and all other art forms of South
            India. The city is an important centre for Carnatic music and hosts
            a large cultural event, the annual Madras Music Season during
            Dec-Jan, which includes performances by hundreds of artists.
          </p>
        </div>
      </div>
      <footer class="footer">
        <div class="footer-links">
          <p>Feedback</p>
          <p>Website Policies</p>
          <p>Contact Us</p>
          <p>Help</p>
          <p>Disclaimer</p>
        </div>

        <div class="footer-content">
          <p>Content Owned by City Civil & Sessions Court, Chennai</p>
          <p>Developed and hosted by National Informatics Centre,</p>
          <p>Ministry of Electronics & Information , Government of India</p>
        </div>

        <div class="footer-social">
          <p>
            Last Updated: <strong>SEP 8, 2024</strong>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
