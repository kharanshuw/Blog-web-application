import React, { useEffect, useState } from 'react';
import { Container, PostForm, databaseservice } from '../component/index.js';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {

    const [posts, setPosts] = useState([]);
    const { documentid } = useParams();

    const navigate = useNavigate();



    useEffect(
        async () => {
            if (documentid) {
                let post = await databaseservice.getPost(documentid);

                if (post) {
                    console.log("post fetch successfully");
                    setPosts(post);
                }
            }
            else {
                console.log("documentid not recived");
                navigate('/');
            }
        }
        , [documentid, navigate]
    )




    return posts ? (
        <div className='py-8'>
            <Container>
                <PostForm post={posts}>

                </PostForm>
            </Container>
        </div>
    )
        :
        null
}

export default EditPost