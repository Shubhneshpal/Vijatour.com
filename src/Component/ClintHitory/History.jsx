import React from "react";

import "./history.css"
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

const History = () => {
  return (
    <div>
      <div className="">
      <div className="mainHead">
              <h1>User History</h1>
            </div>
        <div className="countryBise">
          <div className="card00">           

            <MDBCard>
              <MDBCardImage
                src="https://mdbootstrap.com/img/new/standard/nature/182.webp"
                alt="..."
                position="top"
              />
              <MDBCardBody>
                <MDBCardText>
                  <div className="userInformation">
                    <p>Name Of Traveller </p>
                    <p>Date Of Applicate </p>
                    <p>Destination </p>
                    <p>Response Date By</p>
                    <p>Total Price</p>
                  </div>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>

            <MDBCard>
              <MDBCardImage
                src="https://mdbootstrap.com/img/new/standard/nature/182.webp"
                alt="..."
                position="top"
              />
              <MDBCardBody>
                <MDBCardText className="userInformation">
                  <div className="userHistory">
                    <p>Name Of Traveller </p>
                    <p>Date Of Applicate </p>
                    <p>Destination </p>
                    <p>Response Date By</p>
                    <p>Total Price</p>
                  </div>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
            <MDBCard>
              <MDBCardImage
                src="https://mdbootstrap.com/img/new/standard/nature/182.webp"
                alt="..."
                position="top"
              />
              <MDBCardBody>
                <MDBCardText className="userInformation">
                  <div className="userHistory">
                    <p>Name Of Traveller </p>
                    <p>Date Of Applicate </p>
                    <p>Destination </p>
                    <p>Response Date By</p>
                    <p>Total Price</p>
                  </div>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
