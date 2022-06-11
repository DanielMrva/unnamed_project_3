import "./Createpost.css";
import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";

let catArr = [];

export default function Createpost() {
  const [formData, setFormData] = useState({});

  const [addEvent, { error }] = useMutation(ADD_EVENT);

  const categoryArr = [
    "Visual Sighting",
    "Audible Sighting",
    "Physical contact",
    "Environmental change",
    "PsychoKinesis",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    if (e.target.checked) {
      catArr.push(e.target.name);
    }

    if (!e.target.checked) {
      let index = catArr.indexOf(e.target.name);
      console.log(index);
      catArr.splice(index, 1);
    }

    console.log(catArr);
    setFormData({ ...formData, category: catArr });
  };

  // handles the form submit and runs the create mutation
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.category || formData.category.length === 0) {
      console.log("Please select at least one category");
      return;
    }

    console.log(formData);

    try {
      const { data } = await addEvent({
        variables: {
          category: formData.category,
          date: formData.date,
          description: formData.description,
          type: formData.type,
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng),
          encounterUser: "allison.fischer",
          userId: "123456",
          title: "Test Title",
        },
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTypeChange = (e) => {
    setFormData({ ...formData, type: e.target.id });
  };

  return (
    <div className="create-post">
      <h6>Tell me about your encounter</h6>
      {/* make this a generated location */}
      <div className="input-flex-container">
        <div className="main-box">
          <form className="encounter-form" onSubmit={submitHandler}>
            {/* <label className="sub-text-form">Date</label> */}
            <input
              className="encounter-input-style"
              type="text"
              placeholder="Date"
              value={formData.date ?? ""}
              name="date"
              onChange={handleInputChange}
            ></input>

            {/* <label className="sub-text-form">Latitude</label> */}
            <input
              className="encounter-input-style"
              type="text"
              placeholder="Latitude"
              value={formData.lat ?? ""}
              name="lat"
              onChange={handleInputChange}
            ></input>

            {/* <label className="sub-text-form">Longitude</label> */}
            <input
              className="encounter-input-style"
              type="text"
              placeholder="Longitude"
              value={formData.lng ?? ""}
              name="lng"
              onChange={handleInputChange}
            ></input>

            {/* <label className="sub-text-form">Describe Your Encounter</label> */}
            <input
              className="encounter-textarea-style"
              type="textarea"
              placeholder="Description"
              value={formData.description ?? ""}
              name="description"
              onChange={handleInputChange}
            ></input>

            <div className="button-box">
              <span id="radio-buttons">
                <div>
                  {/* <label className="sub-text-form">Encounter Kind</label> */}
                </div>
                <input
                  type="radio"
                  placeholder="Category"
                  value={formData.category ?? ""}
                  id="Paranormal"
                  className="radio-element"
                  name="category"
                  onChange={handleTypeChange}
                ></input>
                <label for="paranormal">
                  <i className="fa-solid fa-ghost fa-2xl"></i>
                </label>

                <input
                  type="radio"
                  className="radio-element"
                  value={formData.category ?? ""}
                  id="Zoological"
                  name="category"
                  onChange={handleTypeChange}
                ></input>
                <label for="crypto-zoological">
                  <i className="fa-solid fa-dragon fa-2xl"></i>
                </label>

                <input
                  type="radio"
                  className="radio-element"
                  value={formData.category ?? ""}
                  id="Extraterrestrial"
                  name="category"
                  onChange={handleTypeChange}
                ></input>
                <label for="extraterrestrial">
                  <i className="fa-solid fa-rocket fa-2xl"></i>
                </label>
              </span>
            </div>

            <div className="button-box">
              {/* <label className="sub-text-form">
                Changes in environment or self as a result of encounter{" "}
              </label> */}
              <span id="checkbox">
                {categoryArr.map((item, index) => {
                  return (
                    <div>
                      <input
                        className="check-input"
                        type="checkbox"
                        value={item}
                        key={index}
                        name={item}
                        onChange={handleCategoryChange}
                      ></input>
                      <label className="sub-text-form category">{item}</label>
                    </div>
                  );
                })}
              </span>
            </div>

            <input type="submit" value="Submit!" className="button1 sub-text" />
          </form>
        </div>
      </div>
    </div>
  );
}
