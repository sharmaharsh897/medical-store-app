import React from "react";
import "./Services.css";
import orderOnlineIcon from "../components/assets/services-icons/orderOnline.png";
import allMedicinesIcon from "../components/assets/services-icons/allMedicines.png";
import freeConsultIcon from "../components/assets/services-icons/freeConsult.png";
import lowCostIcon from "../components/assets/services-icons/lowCost.png";
import govenrmentIcon from "../components/assets/services-icons/government.png";
import hospitalIcon from "../components/assets/services-icons/hospital.png";
import onlineConsultationIcon from "../components/assets/services-icons/onlineConsultation.png";
import vaccinationIcon from "../components/assets/services-icons/vaccination.png";
import deliveryIcon from "../components/assets/services-icons/delivery.png";
import twofourseverIcon from "../components/assets/services-icons/247.png";
import diseaseIcon from "../components/assets/services-icons/disease.png";
import checkupIcon from "../components/assets/services-icons/checkup.png";

const Services = () => {
  const servicesData = [
    {
      imgSrc: orderOnlineIcon,
      text: "Order your medicines online with ease and convenience.",
    },
    {
      imgSrc: allMedicinesIcon,
      text: "Find all kinds of healthcare products in one place.",
    },
    {
      imgSrc: freeConsultIcon,
      text: "Get free expert consultations for your health concerns.",
    },
    {
      imgSrc: lowCostIcon,
      text: "No extra or hidden charges – we care for your health and budget.",
    },
    {
      imgSrc: govenrmentIcon,
      text: "We are government-approved and provide certified, government-approved medicines.",
    },
    {
      imgSrc: hospitalIcon,
      text: "Located nearby to the Jaya Arogya Government Hospital for your convenience.",
    },
    {
      imgSrc: onlineConsultationIcon,
      text: "Access virtual consultations with healthcare professionals from home.",
    },
    {
      imgSrc: vaccinationIcon,
      text: "We provide vaccinations for everyone – for your protection and peace of mind.",
    },
    {
      imgSrc: twofourseverIcon,
      text: "Emergency access to essential medications, even after hours, for your peace of mind.",
    },
    {
      imgSrc: deliveryIcon,
      text: "Fast and reliable home delivery of your prescriptions and health products.",
    },
    {
      imgSrc: diseaseIcon,
      text: "Personalized support for managing chronic conditions like diabetes, hypertension, and asthma.",
    },
    {
      imgSrc: checkupIcon,
      text: "Get basic health screenings for blood pressure, cholesterol, and blood sugar levels at our store.",
    },
  ];

  return (
    <div className="container">
      <h2>Our Services</h2>
      <div className="services-container">
        {servicesData.map((service, index) => (
          <div key={index} className="service-box">
            <img
              src={service.imgSrc}
              alt={service.text}
              className="service-icon"
            />
            <p className="service-text">{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
