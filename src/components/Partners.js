import React from "react";
import "./Partners.css";
import metropolis from "../components/assets/Partners/Metropolis.png";
import srl from "../components/assets/Partners/srl.png";
import thyrocare from "../components/assets/Partners/thyrocare.png";
import apex from "../components/assets/Partners/apex.jpeg";
import redcliffe from "../components/assets/Partners/redcliffe.png";
import mankind from "../components/assets/Partners/mankind.jpeg";
// import lalpathlabs from "../components/assets/Partners/lalpathlabs.jpg";
// import apollolabs from "../components/assets/Partners/apollolabs.png";

const partners = [
  //   { name: "All Path Labs", image: lalpathlabs },
  //   { name: "Apollo Labs", image: apollolabs },
    { name: "Mankind", image: mankind },
  { name: "SRL Diagnostics", image: srl },
  { name: "Apex Diagnostics", image: apex },
  { name: "Redcliffe Labs", image: redcliffe },

  { name: "Thyrocare", image: thyrocare },
  { name: "Metropolis", image: metropolis },
  {
    name: "Dr. Lal PathLabs",
    image: "https://www.lalpathlabs.com/images/logo.png",
  },
  { name: "Thyrocare", image: "https://www.thyrocare.com/images/logo.png" },
  {
    name: "Apollo Diagnostics",
    image: "https://www.apollodiagnostics.in/images/logo.png",
  },
];
function Partners() {
  return (
    <div className="partners-section">
      <h2 className="partners-name-heading">Our Partners</h2>
      <div className="partners-slider">
        <div className="partners-track">
          {/* Repeat elements 4 times for infinite scrolling effect */}
          {[...partners, ...partners, ...partners, ...partners].map(
            (partner, index) => (
              <div key={index} className="partner-logo">
                <img src={partner.image} alt={partner.name} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
export default Partners;
