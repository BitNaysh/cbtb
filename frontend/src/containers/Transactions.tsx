import { UploadFile } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const Transactions = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [_file, set_File] = useState<null | FormData>(null);

    const [img_url, set_img_url] = useState("");
    const [person, setPerson] = useState<any>({});

    const handleImageUpload = async (file: any) => {
        console.log(file);
        const formData = new FormData();
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
        _file?.append("name", name);
        _file?.append("address", address);
        _file?.append("description", description);
        console.log(_file?.getAll("name")[0]);
        console.log(_file?.getAll("address")[0]);
        console.log(_file?.getAll("description")[0].valueOf());
        console.log(_file?.getAll("image_url")[0]);
        setIsLoading(true);

        const res = await axios.post("http://localhost:8000/api/train_image/media/", _file, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        if (res) {
            setPerson(res.data);
            console.log(res);
        }
        setIsLoading(false);
        setShowResult(true);
    };

    function handleNameChange(e: any) {
        setName(e.target.value);
    }
    function handleAddressChange(e: any) {
        setAddress(e.target.value);
    }
    function handleDescriptionChange(e: any) {
        setDescription(e.target.value);
    }
    const handleAddMoreImage = () => {
        setIsLoading(false);
        setShowResult(false);
        setName("");
        setAddress("");
        setDescription("");
        set_File(null);
    };

    return (
        <div className='mt-10'>
            <Typography variant='h4' component='h1'>
                Add Image to Database
            </Typography>
            {isLoading ? (
                <Box className='sm:w-full md:w-2/3 mt-10 flex justify-center'>
                    <div role='status' className='w-full mt-10 flex justify-center'>
                        <svg
                            aria-hidden='true'
                            className='mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                            viewBox='0 0 100 101'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                fill='currentColor'
                            />
                            <path
                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                fill='currentFill'
                            />
                        </svg>
                        <span className='sr-only'>Loading...</span>
                    </div>
                </Box>
            ) : showResult ? (
                <>
                    <Box className='sm:w-full md:w-2/3 mt-10 '>
                        <Box className='w-full mt-10 p-5 flex  justify-start align-middle h-[24rem] bg-slate-100 rounded-md'>
                            <Box className='flex w-1/2 h-full align-middle justify-center'>
                                <img
                                    className=' object-contain  w-full h-72 m-3 rounded-md  '
                                    src={person && person.image_url}
                                    alt='img'
                                />
                            </Box>

                            <Box className='flex flex-col w-1/2 gap-1 mt-9 px-5 align-middle'>
                                <div className='text-[12px] text-start mt-1 text-slate-800'>
                                    <span className='text-slate-900'>Name : </span>{" "}
                                    {person && person.name}
                                </div>
                                <div className='text-[12px] mt-1 text-slate-800'>
                                    <span className='text-slate-900'>Address : </span>
                                    {person && person.address}
                                </div>
                                <div className='text-[12px] mt-1 text-slate-800'>
                                    <span className='text-slate-900'>Description : </span>
                                    {person && person.description}
                                </div>
                            </Box>
                        </Box>
                        <Box className='w-full mt-5 flex justify-center'>
                            <button
                                type='button'
                                onClick={handleAddMoreImage}
                                className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                            >
                                Try Again
                            </button>
                        </Box>
                    </Box>
                </>
            ) : (
                <>
                    <Box className='sm:w-full md:w-2/3 mt-10 flex justify-center'>
                        <Box className='bg-slate-100 p-5 sm:w-full md:w-2/3  rounded-md mb-5 flex flex-col gap-2'>
                            <div className='relative'>
                                <input
                                    value={name}
                                    onChange={handleNameChange}
                                    type='text'
                                    id='floating_filled_1'
                                    className='block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-600 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                    placeholder=' '
                                />
                                <label
                                    htmlFor='floating_filled_1'
                                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'
                                >
                                    Name
                                </label>
                            </div>
                            <div className='relative'>
                                <input
                                    value={address}
                                    onChange={handleAddressChange}
                                    type='text'
                                    id='floating_filled_2'
                                    className='block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-600 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                    placeholder=' '
                                />
                                <label
                                    htmlFor='floating_filled_2'
                                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4'
                                >
                                    Address
                                </label>
                            </div>

                            <div>
                                <label
                                    htmlFor='message'
                                    className='block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
                                >
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    id='message'
                                    rows={4}
                                    className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    placeholder='Description ...'
                                ></textarea>
                            </div>
                        </Box>
                    </Box>
                    <Box className='sm:w-full md:w-2/3 mt-10'>
                        <Dropzone onDrop={(acceptedFiles) => handleImageUpload(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className='h-auto rounded-md py-6 bg-blue-200 flex flex-col justify-center items-center'>
                                        <div>
                                            <UploadFile className='text-4xl text-blue-700' />
                                        </div>
                                        <text className='mt-2 text-center text-blue-700'>
                                            {_file
                                                ? (_file?.getAll("image_url")[0] as any).path
                                                : "Drag and drop or click to add file"}
                                        </text>
                                    </div>
                                </div>
                            )}
                        </Dropzone>
                    </Box>
                    <Box className='sm:w-full md:w-2/3 mt-10 flex justify-center'>
                        <button
                            type='button'
                            onClick={handelSubmit}
                            className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                        >
                            Add Image
                        </button>
                    </Box>
                </>
            )}
        </div>
    );
};

export default Transactions;
