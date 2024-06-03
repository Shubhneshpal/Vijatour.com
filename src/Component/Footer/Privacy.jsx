import React from "react";
import "./footer.css";
import Header from "../Home/Header";
const Privacy = () => {
  return (
    <>
      <div className="aboutpage">
        <Header />
      </div>
      <div className="container">
        <div className="row">
          <div className="aboutPage">
            <div className="aboutHeading">
              <h3>Privacy Policy</h3>
              <h4>Introduction</h4>
              <p>
                Welcome to [Your Company Name]. We are committed to protecting
                your privacy and ensuring the security of your personal
                information. This Privacy Policy outlines how we collect, use,
                disclose, and protect your information when you use our
                services. By using our services, you agree to the practices
                described in this policy.
              </p>
            </div>
            <div className="aboutHeading">
              <h4>Information We Collect</h4>
              <p>
                We collect various types of information to provide you with the
                best possible service and to improve our offerings. The
                information we collect includes:
              </p>

              <ul>
                <li>
                  <span>Personal Information:</span> This includes your name,
                  address, email address, phone number, date of birth, passport
                  details, and other identifying information necessary for visa
                  processing.
                </li>
                <li>
                  <span>Payment Information:</span> We collect payment details
                  such as credit card numbers and billing addresses to process
                  your transactions.
                </li>
                <li>
                  <span>Travel Information:</span> This includes travel dates,
                  destinations, and other details required for visa
                  applications.
                </li>
                <li>
                  <span>Usage Data:</span> We collect information about how you
                  use our website and services, including your IP address,
                  browser type, and pages visited.
                </li>
              </ul>
            </div>
            <div className="aboutHeading">
              <h4>How We Use Your Information</h4>
              <p>
                We use the information we collect for the following purposes:
              </p>

              <ul>
                <li>
                  <span>Visa Processing:</span> To complete your visa
                  application and ensure timely responses.
                </li>
                <li>
                  <span>Communication:</span> To contact you with updates,
                  notifications, and support related to your visa application.
                </li>
                <li>
                  <span>Payment Processing</span> To process payments for our
                  services securely.
                </li>
                <li>
                  <span>Improvement of Services:</span> To analyze usage
                  patterns and improve our website and services.
                </li>
                <li>
                  <span>Legal Compliance:</span> To comply with legal
                  requirements and protect our legal rights.
                </li>
              </ul>
            </div>
            <div className="aboutHeading">
              <h4>How We Share Your Information</h4>
              <p>
                We may share your information with third parties in the
                following circumstances:
              </p>

              <ul>
                <li>
                  <span>Service Providers:</span> We share information with
                  trusted third-party service providers who assist us in
                  operating our website, conducting our business, and providing
                  services to you. These providers are contractually obligated
                  to protect your information.
                </li>
                <li>
                  <span>Legal Requirements:</span> We may disclose your
                  information if required by law, such as in response to a
                  subpoena or other legal process.
                </li>
                <li>
                  <span>Payment Processing</span> To process payments for our
                  services securely.
                </li>
                <li>
                  <span>Business Transfers:</span> In the event of a merger,
                  acquisition, or sale of assets, your information may be
                  transferred to the new entity.
                </li>
              </ul>
            </div>
            <div className="aboutHeading">
              <h4>Data Security</h4>
              <p>
                We implement a variety of security measures to maintain the
                safety of your personal information. These measures include
                encryption, secure socket layer (SSL) technology, and other
                methods to protect your data from unauthorized access,
                alteration, disclosure, or destruction.
              </p>

              <h4>Data Security</h4>
              <p>You have the right to:</p>

              <ul>
                <li>
                  <span>Access Your Information: </span> Request a copy of the
                  personal information we hold about you.
                </li>
                <li>
                  <span>Correct Your Information:</span>Request corrections to
                  any inaccurate or incomplete personal information.
                </li>
                <li>
                  <span>Delete Your Information:</span> Request the deletion of
                  your personal information, subject to legal and contractual
                  obligations.
                </li>
                <li>
                  <span>Withdraw Consent:</span>Withdraw your consent for us to
                  use your personal information at any time.
                </li>
              </ul>
            </div>

            <div className="aboutHeading">
              <h4>Cookies and Tracking Technologies</h4>
              <p>
                We use cookies and similar tracking technologies to enhance your
                experience on our website. Cookies are small files that a site
                or its service provider transfers to your computer's hard drive
                through your web browser, enabling the site to recognize your
                browser and capture certain information. You can choose to
                disable cookies through your browser settings, but this may
                affect your ability to use some features of our website.
              </p>
            </div>
            <div className="aboutHeading">
              <h4>Changes to This Privacy Policy</h4>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. We will notify
                you of any significant changes by posting the updated policy on
                our website and updating the effective date. Your continued use
                of our services after any changes indicates your acceptance of
                the updated policy.
              </p>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;



