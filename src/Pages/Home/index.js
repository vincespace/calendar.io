import React from 'react';
import {  useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline';
import EventCardComponent from '../../components/eventCard';
import SearchComponent from '../../components/searchComponent';

const Home = () => {
  const { events } = useSelector((state) => state.data);

  return (
    <div className="h-full bg-gray-300 text-gray-800">
      <div className="p-4 w-full h-full">
        <div className="h-12 grid grid-cols-12 gap-5 ">
          <CalendarIcon className="h-8 w-8 col-span-4 sm:col-span-5 md:col-span-5 ml-auto rounded-xl text-black" />
          <h1 className="text-2xl text-black  col-span-8 sm:col-span-7 md:col-span-7 font-bold">
            CALENDAR PLANS
          </h1>
        </div>
        <SearchComponent />
        <div className="grid grid-cols-12 gap-5 justify-items-center py-2">
          <EventCardComponent events={events} />
        </div>
        <div className="flex flex-row justify-center items-end pt-24">
          <Link
            to={'/create'}
            className=" bg-green-600 sm:w-1/3 md:w-1/4 lg:4/6 flex flex-row justify-center rounded-xl p-2 text-white gap-3"
          >
            <PlusCircleIcon className="w-8 h-8" />
            <h2 className="font-bold pt-1">CREATE EVENT</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
