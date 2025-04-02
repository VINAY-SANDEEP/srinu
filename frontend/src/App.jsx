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
  const [showFlowers, setShowFlowers] = useState(false);

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
      let orginalclass = "23MH1A42";
      let random = Math.floor(Math.random() * 71) + 1;
      url = `https://info.aec.edu.in/ACET/StudentPhotos/${orginalclass + random}.jpg`;
    }
    setImgUrl(url);
    setShowFlowers(true);
    setTimeout(() => setShowFlowers(false), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative overflow-hidden">
      {showFlowers && (
        <AnimatePresence>
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{ left: `${Math.random() * 100}%`, top: "100%" }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -500 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              🌸
            </motion.div>
          ))}
        </AnimatePresence>
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
              alt="Image not found"
              className="w-50 h-45 object-cover border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RadioButtonGroup;
