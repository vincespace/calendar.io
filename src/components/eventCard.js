import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEventStart,
  loadEventsStart,
  updateEventStart,
} from '../redux/actions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ExclamationCircleIcon,
  PencilAltIcon,
  TrashIcon,
  CogIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline';

const EventCardComponent = (props) => {
  const { events } = props;
  const { error, eventUpdateLoading } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEventsStart());
  }, [dispatch]);

  useEffect(() => error && toast.error(error), [error]);

  const handleDelete = (id) => {
    if (window.confirm('Confirm deletion of item.')) {
      dispatch(deleteEventStart(id));
      toast.success('Event deleted successfully.');
    }
  };

  useEffect(() => {
    if (!eventUpdateLoading) {
      dispatch(loadEventsStart());
    }
  }, [eventUpdateLoading]);

  const handleUpdateStatus = (status, item) => {
    const formValue = item;
    formValue.status = status;

    dispatch(updateEventStart({ id: formValue.id, formValue }));
  };

  const toggleArray = [
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

  const statusChecker = (status) => {
    if (status === 'done') {
      return {
        bgColor: 'bg-green-300',
        toggleColor: 'bg-green-500',
        icon: <CheckCircleIcon className={'w-10 h-10 text-green-600'} />,
      };
    } else if (status === 'ongoing') {
      return {
        bgColor: 'bg-blue-300',
        toggleColor: 'bg-blue-500',
        icon: <CogIcon className={'w-10 h-10 text-blue-600'} />,
      };
    } else {
      return {
        bgColor: 'bg-red-300',
        toggleColor: 'bg-red-500',
        icon: <ExclamationCircleIcon className={'w-10 h-10 text-red-600'} />,
      };
    }
  };

  return (
    <>
      {events.length > 0
        ? events.map((item) => {
            return (
              <div
                key={item.id}
                className="col-span-12 sm:col-span-12 md:col-span-12 w-10/12 lg:max-w-2xl "
              >
                <div className="flex flex-rowbg-white shadow-xl rounded-3xl px-4 py-2 relative bg-white">
                  <div
                    className={`${
                      statusChecker(item.status).bgColor
                    } flex justify-center items-center h-full w-14 rounded-bl-2xl rounded-tl-2x absolute left-0 top-0 `}
                  >
                    {statusChecker(item.status).icon}
                  </div>
                  <div className="grid grid-cols-12 ml-12 ">
                    <div className="pb-1 col-span-12">
                      <div className="text-md font-bold text-gray-800 w-9/12 md:max-w-2xl ">
                        {item.title}
                      </div>
                    </div>
                    <div className="pb-2 col-span-12 w-8/12 truncate">
                      <p className="text-sm">{item.description}</p>
                    </div>
                    <div className="pb-2 col-span-12 w-8/12">
                      <p className="text-sm">{item.platform}</p>
                    </div>
                    <div className="pb-2 col-span-12 w-8/12">
                      <p className="text-sm">{item.url}</p>
                    </div>
                    <div
                      className={`${
                        statusChecker(item.status).toggleColor
                      } w-20 text-center tracking-widest rounded-2xl col-span-12`}
                    >
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleUpdateStatus(e.target.value, item)
                        }
                        className="text-xs lg:text-sm text-gray-900 bg-transparent focus:outline-none border-none p-1 lg:p-1.5 w-full"
                      >
                        <option value="" disabled>
                          Select filter...
                        </option>
                        {toggleArray.map((toggle) => (
                          <option
                            className="bg-white focus:outline-none border-none"
                            value={toggle.value}
                          >
                            {toggle.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col item-center justify-center cursor-pointer text-gray-600 right-3 sm:right-6 md:right-10 absolute text-xs sm:text-sm ">
                    <Link to={`/editEvent/${item.id}`}>
                      <div className="p-2">
                        <PencilAltIcon className="text-gray-600 h-5 w-5 sm:h-7 sm:w-7" />
                      </div>
                    </Link>

                    <div className="p-2" onClick={() => handleDelete(item.id)}>
                      <TrashIcon className="text-red-700 h-5 w-5 sm:h-7 sm:w-7" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : 'Not Available'}
    </>
  );
};

export default EventCardComponent;
