import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { searchEventStart } from '../redux/actions';

const SearchComponent = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState('');
  const getSearch = (inputEvent) => {
    const search = inputEvent.target.value;
    setSearch(search);
    dispatch(searchEventStart(search, 'title'));
  };

  const handleChange = (inputEvent) => {
    const val = inputEvent.target.value;
    setFilterStatus(val);
    dispatch(searchEventStart(val, 'status'));
  };

  const filterArray = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'Done',
      value: 'done',
    },
    {
      label: 'Pending',
      value: 'pending',
    },
    {
      label: 'Ongoing',
      value: 'ongoing',
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-6  sm:col-span-12">
          <div className="flex sm:justify-center sm:items-center sm:flex-row justify-end">
            <div className="flex items-center bg-white rounded-full h-10 sm:h-14 sm:w-4/6 w-3/6 py-2 px-3">
              <input
                className="w-full px-3 rounded focus:outline-none text-base"
                id="search"
                type="text"
                placeholder="Search"
                value={search}
                onChange={getSearch}
                autoComplete="off"
              />
              <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-7 h-7 md:w-10 md:h-10 flex items-center justify-center">
                <SearchIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-12">
          <div className="flex sm:justify-center sm:items-center sm:flex-row ">
            <div className="flex items-center bg-white rounded-full h-10 sm:h-14 sm:w-4/6 w-3/6 py-2 px-3">
              <select
                id="status"
                name="status"
                value={filterStatus}
                onChange={handleChange}
                className="bg-white focus:outline-none border-none focus:shadow-outline border-gray-300 focus:border-green-400 rounded-lg px-3 py-2 w-full appearance-none leading-normal"
              >
                <option value="" disabled>
                  Select filter...
                </option>
                {filterArray.map((filter) => (
                  <option value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
