import React from 'react'
import "../Footer/footer.css"
import { Link, NavLink } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { AiFillInstagram } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
       <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="footerRight">
                {/* <NavLink to={"/"} className="footer-logo">
                  <img src={logo} alt="logo" width={170} height={80} />
                </NavLink> */}

                <p>
                  Vehicle Bells will help in keeping a record of the distance
                  traveled by a vehicle for business, tax, or personal purposes.
                  This information is often used to calculate the amount of
                  reimbursement for business-related travel expenses or to
                  determine the tax deduction for the use of a personal vehicle
                  for business purposes.
                </p>
              </div>
            </div>
            {/* <div className="col-lg-8">
              <div className="row"> */}
                <div className="col-lg-4">
                  <div className="part1">
                    <div className="slogan">
                      <h4>COMPANY</h4>
                    </div>
                    <ul>
                      <li><Link to={"/aboutus"}>About Us</Link></li>
                      <li><Link to={"/travelervlogs"}>Traveler Vlog</Link></li>
                      <li><Link to={"/privacy"}>Privacy Policy</Link></li>
                    </ul>
                  </div>
                </div>               
                <div className="col-lg-4">
                  <div className="part1">
                    <div className="slogan">
                      <h4>CONTACT US</h4>
                    </div>
                    <ul className="icons">
                      <li>
                        <NavLink>
                          <MdEmail /> support@vehiclebells.com
                        </NavLink>{" "}
                      </li>
                      <li>
                        {" "}
                        <NavLink>
                          <BsTelephoneFill /> (+91) 2141526541 INDIA
                        </NavLink>
                      </li>                    
                    </ul>                   
                  </div>
                  <ul className="icon01">
                      <li>
                        <BiLogoFacebookCircle />
                      </li>
                      <li>
                        <BiLogoTwitter />
                      </li>
                      <li>
                        <AiFillInstagram />
                      </li>
                      <li>
                        <BsYoutube />
                      </li>
                    </ul>
                </div>
              {/* </div>
            </div> */}
          </div>
          <div className="copyright">
            <p>Copyright 2023 Vehicle Bells</p>
          </div>
          <Link className="backToTop"><FaWhatsapp/></Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
