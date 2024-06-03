import React from "react";
import "./TravelerVlog.css";
import Accordion from "react-bootstrap/Accordion";
import Header from "../Home/Header";
import Malaysia from "../images/malaysia_11zon.png";
import Australia from "../images/australia_11zon.jpg";

const TravelerVlogs = () => {
  return (
    <>
      <div className="HeaderVlog">
        <Header />
      </div>
      <div className="TravelerVlogs">
        <div className="container">
          <div className="row">
            <div className="Accordian_Box">
              <div className=" visaCard_content ">
                <p>{/* <span>Notice:</span> {country.notice} */}</p>
                <h4>Traveler Vlogs</h4>
              </div>
              <div className="accordian11">
                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header className="accordianHeading">
                     <h4> How to apply for Malaysia</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="vlogimages">
                        <img src={Malaysia} alt="img" />
                      </div>
                      <div className="aboutPage">
                        <div className="aboutHeading">
                          <h4>Free Visa on Arrival for Indian Travelers</h4>
                          {/* <h4>Introduction</h4> */}
                          <p>
                            Traveling to Malaysia has never been easier for
                            Indian tourists! With its stunning landscapes,
                            vibrant cities, and rich cultural heritage, Malaysia
                            is a top destination for travelers from around the
                            world. The best part? Indian citizens can now enjoy
                            a visa-free entry upon arrival. In this blog, we'll
                            guide you through everything you need to know about
                            Malaysia's visa-on-arrival policy and the essential
                            steps for obtaining your arrival card.
                          </p>
                        </div>
                        <div className="aboutHeading">
                          <h4>Visa on Arrival: A Gateway to Malaysia</h4>
                          {/* <h4>Introduction</h4> */}
                          <p>
                            As of recent updates, Indian nationals can visit
                            Malaysia without the hassle of applying for a
                            traditional visa in advance. Instead, you can enjoy
                            a visa-free entry on arrival, making your travel
                            planning smoother and more convenient. This policy
                            is designed to encourage tourism and make it easier
                            for travelers to explore the wonders of Malaysia.
                          </p>
                        </div>
                        <div className="aboutHeading">
                          <h4>The Arrival Card: Your Key to Entry</h4>
                          {/* <h4>Introduction</h4> */}
                          <p>
                            While the visa on arrival is free, Indian travelers
                            must complete an arrival card application before
                            entering Malaysia. This process is straightforward
                            but requires attention to detail to ensure a
                            hassle-free entry.
                          </p>
                        </div>
                        <div className="aboutHeading">
                          <h4>
                            Here’s a step-by-step guide to obtaining your
                            arrival card:
                          </h4>

                          <ul>
                            <li>
                              <span>Timing is Crucial:</span> You must apply for
                              the arrival card at least 3 days before your
                              planned arrival in Malaysia. This ensures that
                              your details are processed and ready when you
                              reach the entry point.
                            </li>
                            <li>
                              <span>Online Application:</span><b><i> Search for
                              www.vijatour.com and select Malaysia from the list
                              of countries.Start your applocation and upload
                              your passport.Get your arrival card three days
                              before your travel dates.</i></b>
                            </li>
                            <li>
                              <span>Print the Arrival Card:</span>Once your
                              application is approved, print out the arrival
                              card. This printed document is essential and must
                              be presented to immigration officers upon your
                              arrival in Malaysia.
                            </li>
                            <li>
                              <span>Traveling to Malaysia: What to Expect</span>{" "}
                              Upon Arrival: When you land in Malaysia, proceed
                              to the immigration counters designated for
                              visa-on-arrival passengers. Present your printed
                              arrival card along with your passport to the
                              immigration officer. Ensure you have a return
                              ticket and proof of sufficient funds for your
                              stay, as these may be requested.
                            </li>
                            <li>
                              <span>Duration of Stay:</span> The visa on arrival
                              allows Indian travelers to stay in Malaysia for up
                              to 15 days. If you plan to stay longer or explore
                              more of Southeast Asia, make sure to plan your
                              trip accordingly.
                            </li>
                          </ul>
                        </div>
                        <div className="aboutHeading">
                          <h4>Exploring Malaysia</h4>
                          <p>
                            With your visa-free entry sorted, it's time to
                            explore Malaysia's breathtaking attractions. Here
                            are a few must-visit destinations:
                          </p>

                          <ul>
                            <li>
                              <span>Kuala Lumpur:</span> The bustling capital
                              city, known for its iconic Petronas Twin Towers,
                              vibrant street food scene, and bustling markets.
                            </li>
                            <li>
                              <span>Penang:</span>An archipelago with stunning
                              beaches, clear waters, and lush
                              rainforests—perfect for a tropical getaway.
                            </li>
                            <li>
                              <span>Borneo:</span> To process Home to unique
                              wildlife, including orangutans and pygmy
                              elephants, as well as incredible diving spots like
                              Sipadan Island.
                            </li>
                          </ul>
                        </div>
                        <div className="aboutHeading">
                          <h4>Tips for a Smooth Trip</h4>
                          <ul>
                            <li>
                              <span>Plan Ahead:</span> Ensure you apply for your
                              arrival card at least 3 days before your trip.
                            </li>
                            <li>
                              <span>Document Check:</span> Keep all necessary
                              documents, including your printed arrival card,
                              passport, return ticket, and proof of funds,
                              readily accessible.
                            </li>
                            <li>
                              <span>Local Etiquette:</span> Familiarize yourself
                              with Malaysian customs and etiquette to respect
                              local culture and enhance your travel experience.
                            </li>
                          </ul>
                        </div>

                        <div className="aboutHeading travelerVlog">
                          <h4>Conclusion</h4>
                          <p>
                            Malaysia’s visa-on-arrival policy for Indian
                            travelers opens up a world of opportunities for an
                            unforgettable adventure. With just a few simple
                            steps to obtain your arrival card, you can embark on
                            a journey to explore Malaysia's diverse landscapes
                            and rich cultural heritage. Start planning your trip
                            today, and get ready to experience the magic of
                            Malaysia!
                            <h6><span>Happy travels!</span></h6>
                          </p>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="accordian22">
                <Accordion defaultActiveKey={["0"]}>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header className="accordianHeading">
                      <h4>How to apply for Australia</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="vlogimages">
                        <img src={Australia} alt="img" />
                      </div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelerVlogs;
