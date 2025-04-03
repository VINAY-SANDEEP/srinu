import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function RadioButtonGroup() {
  const options = [
    "Aditya University",
    "Aditya College of Engineering",
    "Aditya Polytechnic 1",
    "Aditya Polytechnic 2",
    "T-Hub Fans",
    "Random Generator"
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const [rollno, setRoll] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleRollChange = (e) => {
    setRoll(e.target.value.trim());
  };

  const handleCollegeChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const generateImage = () => {
    let url = "";
    if (selectedOption === options[0]) {
      url = `https://info.aec.edu.in/AEC/StudentPhotos/${rollno}.jpg`;
    } else if (selectedOption === options[1]) {
      url = `https://info.aec.edu.in/ACET/StudentPhotos/${rollno}.jpg`;
    } else if (selectedOption === options[2]) {
      url = `https://info.aec.edu.in/aecpoly/StudentPhotos/${rollno}.jpg`;
    } else if (selectedOption === options[3]) {
      url = `https://info.aec.edu.in/saipoly/StudentPhotos/${rollno}.jpg`;
    } else if (selectedOption === options[4]) {
      let up = rollno.toUpperCase();
      url = `https://mobile.technicalhub.io:5010/student/${up}.png`;
    } else if (selectedOption === options[5]) {
      let originalClass = "23MH1A42";
      let random = Math.floor(Math.random() * 71) + 1;
      url = `https://info.aec.edu.in/ACET/StudentPhotos/${originalClass + random}.jpg`;
    }
    setImgUrl(url);
    setShowAnimation(true);
    setShowPopup(true);
    setTimeout(() => setShowAnimation(false), 5000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 overflow-hidden">
      {showAnimation && (
        <AnimatePresence>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{ left: `${Math.random() * 100}%`, top: "-10%" }}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: "110vh" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 5, ease: "linear" }}
            >
            💮🌸💕
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {showPopup &&  selectedOption === options[1] && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img src="../WhatsApp Image 2025-04-03 at 19.13.39_fccf5608.jpg" alt="" srcset="" />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full relative z-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Student Photo Finder
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Roll Number</label>
          <input
            type="text"
            value={rollno}
            onChange={handleRollChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Roll Number"
          />
        </div>

        <div className="mb-4">
          <p className="text-gray-700 font-medium">Select College:</p>
          {options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2 my-2">
              <input
                type="radio"
                name="radioGroup"
                value={option}
                checked={selectedOption === option}
                onChange={handleCollegeChange}
                className="w-4 h-4 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        <button
          onClick={generateImage}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Generate Image
        </button>

        {imgUrl && (
          <div className="mt-4 flex justify-center">
            <img
              src={imgUrl}
              alt="Generated Student Photo"
              className="w-50 h-45 object-cover border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RadioButtonGroup;