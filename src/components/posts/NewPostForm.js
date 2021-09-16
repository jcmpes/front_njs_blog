import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newPostAction } from '../../store/actions';
import { getToken } from '../../store/selectors';

const NewPostForm = ({ onSubmit }) => {
    const history = useRouter();
    const dispatch = useDispatch();
    const token = useSelector(getToken)
    const [postData, setPostData] = React.useState({
        title: '',
        body: '',
      });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(newPostAction(postData, history));
  };

  const handleChange = (event) => {
    event.preventDefault();
    setPostData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="flex justify-center mb-6">
      <form className="rounded w-1/2 mt-12 mb-12" onSubmit={handleSubmit}>
        <label className="ml-5" htmlFor="title">
          Post Title
        </label>
        <input
          className="w-full rounded block ml-5 mr-5 mb-5 mt-2"
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
        />
        <label className="ml-5" htmlFor="body">
          Content
        </label>
        <textarea
          className="w-full rounded block ml-5 mr-5 mb-5 mt-2"
          name="body"
          value={postData.body}
          onChange={handleChange}
        />
        <button
            className="font-bold text-xl text-white w-full rounded block ml-5 mr-5 mb-5 mt-2 bg-green-300 hover:bg-green-400 active:bg-green-500 p-5"
        >
            Submit
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
