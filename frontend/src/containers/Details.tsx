import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const bases = ["Database 1", "Database 2", "Database 3", "Database 4", "Database 5"];

const Details = () => {
    const [comboItem, setComboItem] = useState(bases[0]);
    const [showCombo, setShowCombo] = useState(false);
    const [people, setPeople] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await axios.get("http://localhost:8000/api/train_image/media/");
            setPeople(res.data);
        })();
    }, []);

    let comboHidden = showCombo ? "" : "hidden";

    return (
        <div className='flex flex-col h-screen pt-10'>
            <Typography className='flex-none' variant='h4' component='h1'>
                Details
            </Typography>
            <Box className='sm:w-full md:w-11/12 mt-10 flex justify-end flex-none'>
                <button
                    id='dropdownDefault'
                    data-dropdown-toggle='dropdown'
                    className={`text-white flex align-middle justify-center w-40 bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    type='button'
                    onClick={() => setShowCombo(!showCombo)}
                >
                    {comboItem}
                    {"  "}
                    {!showCombo ? (
                        <ChevronRight className='rotate-90 transition-all' />
                    ) : (
                        <ChevronLeft className='rotate-90 transition-all' />
                    )}
                </button>
                <div
                    id='dropdown'
                    className={`first-letter:hidden  ${comboHidden} transition-all mt-12 w-40 absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
                >
                    <ul
                        className='py-1 text-sm text-gray-700 dark:text-gray-200'
                        aria-labelledby='dropdownDefault'
                    >
                        {bases.map((base, index) => (
                            <li key={index}>
                                <a
                                    href='/'
                                    className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
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
            <Box className='sm:w-full md:w-11/12 mt-10 grid grid-cols-3 gap-2 overflow-y-scroll scrollbar scorl scrollbar-thin scrollbar- scrollbar-thumb-transparent scrollbar-track-transparent flex-grow'>
                {people &&
                    people.map((person) => (
                        <div className='m-2  bg-slate-100 flex justify-start'>
                            <img
                                className='object-cover w-1/2 h-40 m-5 rounded-md '
                                src={person.image_url}
                            />
                            <div className='w-1/2 pt-5 pr-5 flex flex-col gap-3'>
                                <h2>{person.name.replace(/\b\w/g, (l: any) => l.toUpperCase())}</h2>
                                <h2>{person.address}</h2>
                            </div>
                        </div>
                    ))}
            </Box>
        </div>
    );
};

export default Details;
