import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const user = localStorage.getItem("userData");
    const userData = JSON.parse(user);
    // console.log(userData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', title);
        data.append('caption', caption);
        if (file) {
            data.append('file', file);
        }
        data.append('user', userData._id);

        try {
            const response = await axios.post('http://localhost:8000/api/post/createpost', data, {
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate('/home')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title} 
                placeholder='title' 
            />
            <input 
                type="text" 
                name="caption" 
                onChange={(e) => setCaption(e.target.value)} 
                value={caption} 
                placeholder='caption' 
            />
            <input 
                type="file" 
                name="file" 
                onChange={(e) => setFile(e.target.files[0])} 
            />
            <button type='submit'>Submit</button>
        </form>
    );
};

export default CreatePost;
