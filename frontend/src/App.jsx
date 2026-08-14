import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function RadioButtonGroup() {
  const options = [
    "Aditya University",
    "Aditya Engineering College",
    "Aditya College of Engineering and Technology",
    "Aditya Polytechnic 1",
    "Aditya Polytechnic 2",
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [rollno, setRoll] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRollChange = (e) => {
    setRoll(e.target.value);
  };

  const handleCollegeChange = (event) => {
    setSelectedOption(event.target.value);
    setImgUrl("");
  };

  let url = "";
  const generateImage = () => {
    if (!rollno || !selectedOption) {
      alert("Please enter roll number and select your college.");
      return;
    }


    if (selectedOption === options[0]) {
      url = `https://info.aec.edu.in/aus/StudentPhotos_Original/${rollno.trim()}.jpg?ver=130826024759`;
    } else if (selectedOption === options[1]) {
      url = `https://info.aec.edu.in/AEC/StudentPhotos/${rollno.trim()}.jpg`;
    } else if (selectedOption === options[2]) {
      url = `https://info.aec.edu.in/ACET/StudentPhotos/${rollno.trim()}.jpg`;
    } else if (selectedOption === options[3]) {
      url = `https://info.aec.edu.in/aecpoly/StudentPhotos/${rollno.trim()}.jpg`;
    } else if (selectedOption === options[4]) {
      url = `https://info.aec.edu.in/saipoly/StudentPhotos/${rollno.trim()}.jpg`;
    }

    setLoading(true);
    setImgUrl(url);
    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="app">

      {/* Animated Background */}
      <div className="background">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>

        {[...Array(25)].map((_, i) => (
          <motion.span
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -300],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Falling Images
      <AnimatePresence>
  {showAnimation &&
    [...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="falling-photo"
        style={{
          fontSize: "30px",
        }}
        initial={{
          opacity: 0,
          y: -100,
          x: Math.random() * window.innerWidth,
          // rotate: Math.random() * 90 - 45,
          scale: 0.4,
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: window.innerHeight + 200,
          // rotate: Math.random() * 720 - 360,
          scale: [0.4, 0.8, 0.6],
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 3 + Math.random() * 2,
          ease: "linear",
          delay: Math.random() * 1.5,
        }}
      >
        🧐
      </motion.div>
    ))}
</AnimatePresence> */}

      {/* Main Content */}
      <div className="content">

        {/* Header */}
        <motion.div
          className="header"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="logo"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🎓
          </motion.div>

          <h1>Student Photo Finder</h1>

          <p>
            Enter your roll number and select your college
          </p>
        </motion.div>

        {/* 3D Card */}
        <motion.div
          className="card"
          initial={{
            opacity: 0,
            scale: 0.7,
            rotateX: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
          }}
          transition={{
            duration: 0.8,
            type: "spring",
          }}
          whileHover={{
            rotateX: 2,
            rotateY: -2,
            scale: 1.01,
          }}
        >

          {/* Card Shine */}
          <div className="card-shine"></div>

          {/* Roll Number */}
          <div className="input-section">
            <label>Roll Number</label>

            <div className="input-wrapper">
              <span>🎫</span>

              <input
                type="text"
                value={rollno}
                onChange={handleRollChange}
                placeholder="Enter your roll number"
              />
            </div>
          </div>

          {/* College */}
          <div className="college-section">

            <label>Select College</label>

            <div className="options">

              {options.map((option, index) => (
                <motion.label
                  key={index}
                  className={`radio-card ${
                    selectedOption === option ? "selected" : ""
                  }`}
                  whileHover={{
                    scale: 1.02,
                    x: 5,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                >

                  <input
                    type="radio"
                    name="college"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleCollegeChange}
                  />

                  <span className="custom-radio">
                    <span></span>
                  </span>

                  <span className="college-name">
                    {option}
                  </span>

                  {selectedOption === option && (
                    <motion.span
                      className="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✓
                    </motion.span>
                  )}

                </motion.label>
              ))}

            </div>
          </div>

          {/* Button */}
          <motion.button
            className="generate-btn"
            onClick={generateImage}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 15px 35px rgba(99,102,241,0.5)",
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <span>
              {loading ? "Generating..." : "Generate Student Photo"}
            </span>

            {!loading && <span className="arrow">→</span>}
          </motion.button>

          {/* Image Result */}
          <AnimatePresence mode="wait">

            {imgUrl && (
              <motion.div
                className="result"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotateY: 90,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                }}
              >

                <div className="result-title">
                  <span>✨</span>
                  Student Photo
                </div>

                <motion.div
                  className="photo-container"
                  whileHover={{
                    rotateY: 10,
                    rotateX: -5,
                    scale: 1.05,
                  }}
                >
                  <img
                    src={imgUrl}
                    alt="Student"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </motion.div>

                <p className="roll-display">
                  {rollno.toUpperCase()}
                </p>

              </motion.div>
            )}

          </AnimatePresence>

        </motion.div>

        {/* Footer */}
        <motion.div
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          🙈🙉🙊
        </motion.div>

      </div>
    </div>
  );
}

export default RadioButtonGroup;