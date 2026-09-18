import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const options = [
  {
    name: "Aditya University",
    code: "AU",
    type: "University",
  },
  {
    name: "Aditya Engineering College",
    code: "AEC",
    type: "Engineering",
  },
  {
    name: "Aditya College of Engineering and Technology",
    code: "ACET",
    type: "Engineering",
  },
  {
    name: "Aditya Polytechnic 1",
    code: "AP1",
    type: "Polytechnic",
  },
  {
    name: "Aditya Polytechnic 2",
    code: "AP2",
    type: "Polytechnic",
  },
  {
    name: "AEC Random Generator",
    code: "AEC",
    type: "Random",
  },
  {
    name: "ACET Random Generator",
    code: "ACET",
    type: "Random",
  },
];

function generateRollNumbers(start, end) {
  const prefix = start.substring(0, 2);

  const rolls = [];
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let started = false;

  for (let i = 0; i < chars.length; i++) {
    for (let j = 0; j < 10; j++) {
      const suffix =
        i === 0 ? `0${j + 1}` : `${chars[i]}${j}`;

      const roll = prefix + suffix;

      if (roll === start) {
        started = true;
      }

      if (started) {
        rolls.push(roll);
      }

      if (roll === end) {
        return rolls;
      }
    }
  }

  return rolls;
}

function StudentPhotoFinder() {
  const [selectedOption, setSelectedOption] = useState("");
  const [rollno, setRoll] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // AEC Random Generator
  const aec_aiml = generateRollNumbers("6101", "61J5");
  const aec_cse = generateRollNumbers("0501", "05J5");
  const aec_it = generateRollNumbers("1201", "12C5");

  const aec_total = [
    ...aec_aiml,
    ...aec_cse,
    ...aec_it,
  ];

  // ACET Random Generator
  const acet_aiml3 = generateRollNumbers("4201", "42G0");
  const acet_cse3 = generateRollNumbers("0501", "05G0");
  const acet_it3 = generateRollNumbers("1201", "1264");

  const acet_total = [
    ...acet_aiml3,
    ...acet_cse3,
    ...acet_it3,
  ];

  const isRandomGenerator =
    selectedOption === "AEC Random Generator" ||
    selectedOption === "ACET Random Generator";

  const handleCollegeChange = (value) => {
    setSelectedOption(value);
    setImgUrl("");
    setImageError(false);

    if (value.includes("Random Generator")) {
      setRoll("");
    }
  };

  const handleGenerate = () => {
    if (!selectedOption) {
      return;
    }

    if (!isRandomGenerator && !rollno.trim()) {
      return;
    }

    setLoading(true);
    setImageError(false);

    let url = "";
    let generatedRoll = rollno.trim().toUpperCase();

    if (selectedOption === "Aditya University") {
      url = `https://info.aec.edu.in/aus/StudentPhotos_Original/${rollno.trim()}.jpg?ver=130826024759`;
    }

    else if (selectedOption === "Aditya Engineering College") {
      url = `https://info.aec.edu.in/AEC/StudentPhotos/${rollno.trim()}.jpg`;
    }

    else if (
      selectedOption ===
      "Aditya College of Engineering and Technology"
    ) {
      url = `https://info.aec.edu.in/ACET/StudentPhotos/${rollno.trim()}.jpg`;
    }

    else if (selectedOption === "Aditya Polytechnic 1") {
      url = `https://info.aec.edu.in/aecpoly/StudentPhotos/${rollno.trim()}.jpg`;
    }

    else if (selectedOption === "Aditya Polytechnic 2") {
      url = `https://info.aec.edu.in/saipoly/StudentPhotos/${rollno.trim()}.jpg`;
    }

    else if (selectedOption === "AEC Random Generator") {
      const randomRoll =
        aec_total[
          Math.floor(Math.random() * aec_total.length)
        ];

      generatedRoll = `23A91A${randomRoll}`;

      url = `https://info.aec.edu.in/AEC/StudentPhotos/${generatedRoll}.jpg`;
    }

    else if (selectedOption === "ACET Random Generator") {
      const randomRoll =
        acet_total[
          Math.floor(Math.random() * acet_total.length)
        ];

      generatedRoll = `23MH1A${randomRoll}`;

      url = `https://info.aec.edu.in/ACET/StudentPhotos/${generatedRoll}.jpg`;
    }

    setRoll(generatedRoll);
    setImgUrl(url);

    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white shadow-sm">
              SF
            </div>

            <div>
              <h1 className="text-sm font-bold tracking-tight text-slate-900">
                StudentFinder
              </h1>

              <p className="text-[11px] text-slate-500">
                Campus Photo Directory
              </p>
            </div>

          </div>


          {/* Status */}

          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 sm:flex">

            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-medium text-slate-600">
              Directory Online
            </span>

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-16">

        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">


          {/* =================================================
              LEFT HERO
          ================================================== */}

          <section className="pt-2 lg:pt-10">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">

              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Aditya Institutions
              </span>

            </div>


            <h2 className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[58px]">

              Find student photos
              <span className="block text-slate-500">
                in seconds.
              </span>

            </h2>


            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">

              Select an institution and enter a student roll number
              to retrieve the corresponding photo from the campus
              directory.

            </p>


            {/* Steps */}

            <div className="mt-10 border-t border-slate-200 pt-6">

              <div className="space-y-5">

                {[
                  ["01", "Select your institution"],
                  ["02", "Enter the roll number"],
                  ["03", "View the student photo"],
                ].map(([number, text]) => (

                  <div
                    key={number}
                    className="flex items-center gap-4"
                  >

                    <span className="text-xs font-bold text-slate-300">
                      {number}
                    </span>

                    <span className="text-xs font-semibold text-slate-600">
                      {text}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              FINDER CARD
          ================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >

            {/* Card Header */}

            <div className="border-b border-slate-100 px-6 py-6 sm:px-8">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
                    Photo Lookup
                  </p>

                  <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                    Student details
                  </h3>

                </div>


                <div className="hidden rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-semibold text-slate-500 sm:block">
                  CAMPUS DIRECTORY
                </div>

              </div>

            </div>


            {/* Form */}

            <div className="space-y-7 px-6 py-7 sm:px-8">


              {/* Roll Number */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="roll-number"
                    className="text-xs font-bold text-slate-700"
                  >
                    Roll number
                  </label>

                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    {isRandomGenerator ? "Automatic" : "Required"}
                  </span>

                </div>


                <div className="flex h-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">

                  <div className="flex w-11 items-center justify-center border-r border-slate-200 text-sm font-bold text-slate-400">
                    #
                  </div>

                  <input
                    id="roll-number"
                    type="text"
                    value={rollno}
                    onChange={(e) =>
                      setRoll(e.target.value)
                    }
                    disabled={isRandomGenerator}
                    placeholder={
                      isRandomGenerator
                        ? "Roll number generated automatically"
                        : "Enter student roll number"
                    }
                    className="w-full bg-transparent px-4 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:text-slate-400"
                  />

                </div>

              </div>


              {/* Institution */}

              <div>

                <div className="mb-3 flex items-center justify-between">

                  <label className="text-xs font-bold text-slate-700">
                    Select institution
                  </label>

                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider ${
                      selectedOption
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`}
                  >
                    {selectedOption ? "Selected" : "Required"}
                  </span>

                </div>


                <div className="grid gap-2 sm:grid-cols-2">

                  {options.map((option) => {

                    const selected =
                      selectedOption === option.name;

                    return (

                      <motion.button
                        key={option.name}
                        type="button"
                        onClick={() =>
                          handleCollegeChange(
                            option.name
                          )
                        }
                        whileTap={{
                          scale: 0.98,
                        }}
                        className={`group relative flex min-h-[68px] items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                          selected
                            ? "border-blue-500 bg-blue-50/60 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >

                        {/* Code */}

                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[9px] font-extrabold ${
                            selected
                              ? "bg-slate-900 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {option.code}
                        </div>


                        {/* Name */}

                        <div className="min-w-0 flex-1">

                          <p className="truncate text-[11px] font-bold leading-4 text-slate-700">
                            {option.name}
                          </p>

                          <p className="mt-1 text-[9px] font-medium text-slate-400">
                            {option.type}
                          </p>

                        </div>


                        {/* Radio */}

                        <div
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold ${
                            selected
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {selected && "✓"}
                        </div>

                      </motion.button>

                    );
                  })}

                </div>

              </div>


              {/* Generate Button */}

              <motion.button
                type="button"
                onClick={handleGenerate}
                disabled={
                  loading ||
                  !selectedOption ||
                  (!isRandomGenerator &&
                    !rollno.trim())
                }
                whileTap={{
                  scale: 0.985,
                }}
                className="flex h-13 w-full items-center justify-between rounded-lg bg-slate-900 px-5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >

                <span>
                  {loading
                    ? "Retrieving student photo..."
                    : "Find student photo"}
                </span>

                <span className="text-xl font-normal">
                  {loading ? "..." : "→"}
                </span>

              </motion.button>


              {/* =================================================
                  RESULT
              ================================================== */}

              <AnimatePresence mode="wait">

                {imgUrl && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    className="border-t border-slate-100 pt-7"
                  >

                    {/* Result Header */}

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600">
                          Result
                        </p>

                        <h4 className="mt-1 text-base font-bold text-slate-900">
                          Student photo
                        </h4>

                      </div>


                      <span className="rounded-md bg-slate-100 px-2.5 py-1.5 font-mono text-[10px] font-bold text-slate-600">
                        {rollno}
                      </span>

                    </div>


                    {/* Photo */}

                    <div className="mt-4 flex min-h-[300px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                      {!imageError ? (

                        <img
                          src={imgUrl}
                          alt={`Student ${rollno}`}
                          onError={() =>
                            setImageError(true)
                          }
                          className="block max-h-[520px] w-full object-contain"
                        />

                      ) : (

                        <div className="px-6 py-12 text-center">

                          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-sm font-bold text-amber-600">
                            !
                          </div>

                          <h5 className="mt-4 text-sm font-bold text-slate-700">
                            Photo not found
                          </h5>

                          <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-400">
                            Check the roll number and
                            institution, then try again.
                          </p>

                        </div>

                      )}

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          </motion.section>

        </div>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

          <span className="text-[10px] font-bold text-slate-500">
            STUDENTFINDER
          </span>

          <span className="text-[10px] font-medium text-slate-400">
            Campus directory interface
          </span>

        </div>

      </footer>

    </div>
  );
}

export default StudentPhotoFinder;
