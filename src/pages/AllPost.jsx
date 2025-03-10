import React, { useEffect, useState } from 'react'
import { Container, PostCard, databaseservice } from '../component/index.js';


function AllPost() {

    const [posts, setPosts] = useState([]);

    useEffect(
        () => { }, []
    );


    let fetchpost = async () => {
        try {
            let posts = await databaseservice.getPosts();

            if (posts) {
                setPost(posts.documents);
            }
        } catch (error) {
            console.log("error in AllPost", error);
        }

    }

    fetchpost();

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map(
                            (post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard post={post} />
                                </div>
                            )
                        )
                    }

                </div>
            </Container>
        </div>
    )

}
export default AllPost