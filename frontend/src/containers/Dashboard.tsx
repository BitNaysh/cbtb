import { Box, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import Dropzone from "react-dropzone";
import {
  CheckBox,
  ChevronLeft,
  ChevronRight,
  UploadFile,
} from "@mui/icons-material";
import axios from "axios";
import { Combobox } from "@headlessui/react";

const people = [
  "Database 1",
  "Database 2",
  "Database 3",
  "Database 4",
  "Database 5",
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [_file, set_File] = useState<null | FormData>(null);
  const [comboItem, setComboItem] = useState(people[0]);
  const [showCombo, setShowCombo] = useState(false);

  const [img_url, set_img_url] = useState("");
  const [img_url_match, set_img_url_match] = useState("");

  const [matched_person, set_matched_person] = useState<any>({});

  let comboHidden = showCombo ? "" : "hidden";

  const handleImageUpload = async (file: any) => {
    console.log(file);
    const formData = new FormData();
    formData.append("title", "title");
    formData.append("description", "description");
    formData.append("image_url", file[0]);
    console.log(formData.values);
    set_File(formData);

    // const res = await axios.post("http://localhost:8080/job/upload", formData, {
    //     headers: {
    //         "content-type": "multipart/form-data",
    //     },
    // });

    // setCreateJob({ ...createJob, path: res.data.filename });
  };

  const handelSubmit = async () => {
    console.log(_file?.getAll("image_url")[0].toString());
    setIsLoading(true);
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/compare_face/media/`,
      _file,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    if (res) {
      set_img_url(res.data.image_url);
      const match = res.data.matched_people.sort((p: any, p2: any) => {
        return p.tolerance - p2.tolerance;
      })[0];
      console.log(match);
      set_matched_person(match);
      set_img_url_match(
        `${process.env.REACT_APP_BACKEND_URL}` + match.image_url
      );
      setIsLoading(false);
      setShowResult(true);
    }
  };

  const handelTryAgain = () => {
    setIsLoading(false);
    set_File(null);
    setShowResult(false);
  };

  return (
    <div className="mt-10">
      <Typography variant="h4" component="h1">
        My DashBoard
      </Typography>

      <Box className="sm:w-full md:w-2/3 mt-10 flex justify-end">
        <button
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          className={`text-white flex align-middle justify-center w-40 bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          type="button"
          onClick={() => setShowCombo(!showCombo)}
        >
          {comboItem}
          {"  "}
          {!showCombo ? (
            <ChevronRight className="rotate-90 transition-all" />
          ) : (
            <ChevronLeft className="rotate-90 transition-all" />
          )}
        </button>
        <div
          id="dropdown"
          className={`first-letter:hidden  ${comboHidden} transition-all mt-12 w-40 absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            {people.map((base, index) => (
              <li key={index}>
                <a
                  href="/"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setComboItem(base);
                    setShowCombo(false);
                  }}
                >
                  {base}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Box>

      <Box className="sm:w-full md:w-2/3 mt-10">
        {isLoading ? (
          <div role="status" className="w-full flex justify-center">
            <svg
              aria-hidden="true"
              className="mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : showResult ? (
          <>
            <Box className="w-full mt-10 p-5 flex flex-col justify-center align-middle h-[24rem] bg-slate-100 rounded-md">
              <Box className="flex w-full gap-2 justify-between">
                <img
                  className=" object-cover  w-1/2 h-52 m-3 rounded-md  "
                  src={img_url}
                  alt="img"
                />
                <img
                  className=" object-cover  w-1/2 h-52 m-3 rounded-md "
                  src={img_url_match}
                  alt="img"
                />
              </Box>
              <Box className="w-full flex justify-center align-middle text-[12px]  text-slate-800">
                <span className="w-1/2 text-center">(Trial Image)</span>
                <span className="w-1/2 text-center">(Matched)</span>
              </Box>
              <Box className="flex flex-col w-full gap-1 px-5 align-middle">
                <div className="text-[12px] text-start mt-1 text-slate-800">
                  <span className="text-slate-900">Name : </span>{" "}
                  {matched_person && matched_person.name}
                </div>
                <div className="text-[12px] mt-1 text-slate-800">
                  <span className="text-slate-900">Address : </span>
                  {matched_person && matched_person.address}
                </div>
                <div className="text-[12px] mt-1 text-slate-800">
                  <span className="text-slate-900">Profile : </span>
                  {matched_person && matched_person.description}
                </div>
              </Box>
            </Box>
            <Box className="w-full mt-5 flex justify-center">
              <button
                type="button"
                onClick={handelTryAgain}
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Try Again
              </button>
            </Box>
          </>
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => handleImageUpload(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="h-auto rounded-md py-6 bg-blue-200 flex flex-col justify-center items-center">
                  <div>
                    <UploadFile className="text-4xl text-blue-700" />
                  </div>
                  <text className="mt-2 text-center text-blue-700">
                    {_file
                      ? (_file?.getAll("image_url")[0] as any).path
                      : "Drag and drop or click to add file"}
                  </text>
                </div>
              </div>
            )}
          </Dropzone>
        )}
      </Box>
      {!isLoading && !showResult && (
        <Box className="sm:w-full md:w-2/3 mt-10 flex justify-center">
          <button
            type="button"
            onClick={handelSubmit}
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Match Face
          </button>
        </Box>
      )}
    </div>
  );
};

export default Dashboard;
