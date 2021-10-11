import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEventStart, updateEventStart } from '../../redux/actions';
import { toast } from 'react-toastify';

const initialState = {
  title: '',
  description: '',
  platform: '',
  url: '',
  status: '',
};

const Create = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { events } = useSelector((state) => state.data);
  const [editMode, setEditMode] = useState(false);
  const { title, description, platform, url, status } = formValue;

  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleEvent = events.find((event) => event.id === Number(id));
      setFormValue({ ...singleEvent });
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id, events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit()) {
      toast.error('Fill up all the missing blanks');
    } else {
      if (!editMode) {
        dispatch(createEventStart(formValue));
        toast.success('Event added successfully');
        setTimeout(() => history.push('/'), 500);
      } else {
        dispatch(updateEventStart({ id, formValue }));
        setEditMode(false);
        console.log('Event updated successfully');
        setTimeout(() => history.push('/'), 500);
      }
    }
  };
  const canSubmit = () => {
    return title && description && platform && url && status;
  }
  
  const handleChange = (e) => {
    let value = e.target.value;
    let title = e.target.getAttribute('name');
    setFormValue({ ...formValue, [title]: value });
  };

  return (
    <div className="container px-8 py-10 h-screen bg-gray-300 mr-0 w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl min-w-full">
      <form className="bg-white shadow-md rounded-xl px-8 py-6 pb-8 mb-4 mx-auto max-w-2xl" onSubmit={handleSubmit}>
        <div className="p-2">
          <label
            className="block text-gray-700 text-md text-center font-bold mb-2"
            htmlFor="title"
          >
            TITLE
          </label>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 focus:border-green-400 rounded-lg py-2 px-4 block w-full appearance-none leading-normal h-15"
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={title || ''}
            autoComplete="off"
          />
        </div>
        <div className="p-2">
          <label
            className="block text-gray-700 text-md text-center font-bold mb-2"
            htmlFor="description"
          >
            DESCRIPTION
          </label>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 focus:border-green-400 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            id="description"
            name="description"
            onChange={handleChange}
            value={description || ''}
            type="text"
            autoComplete="off"
          />
          <div className="p-2">
            <label
              className="block text-gray-700 text-md text-center font-bold mb-2"
              htmlFor="platform"
            >
              PLATFORM
            </label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 focus:border-green-400 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              id="platform"
              name="platform"
              onChange={handleChange}
              value={platform || ''}
              type="text"
              autoComplete="off"
            />
          </div>
          <div className="p-2">
            <label
              className="block text-gray-700 text-md text-center font-bold mb-2"
              htmlFor="url"
            >
              URL
            </label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 focus:border-green-400 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              id="url"
              name="url"
              onChange={handleChange}
              value={url || ''}
              type="url"
              autoComplete="off"
            />
          </div>
          <div className="p-2">
            <label
              className="block text-gray-700 text-md text-center font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select id="status" name="status" value={status} onChange={handleChange} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 focus:border-green-400 rounded-lg py-2 px-4 block w-full appearance-none leading-normal">
          <option value="" disabled>Select status...</option>
          <option value="done"> Done </option>
          <option value="ongoing"> Ongoing </option>
          <option value="pending"> Pending </option>
        </select>

          </div>
          <div className="flex justify-center items-center">
          <input type="submit" disabled={!canSubmit()} value={ id ? "Update" : "Save"} className=" bg-green-300 hover:bg-green-500 mt-5 text-xl rounded-xl w-1/4 p-2 tracking-widest" />
          </div>
         
        </div>
      </form>
    </div>
  );
};

export default Create;
