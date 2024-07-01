import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../Components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]); //hook

  useEffect(() => { //hook
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts(); //this has to be written separately as fetchposts is not called on its own here
  }, []);

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-4xl font-bold lg:text-7xl mx-auto'>Hola! Welcome to SCS's Blog</h1>
        <p className=' text-lg sm:text-base mx-auto'>
          You can dive into posts related to the various ongoing activities in SCS, IIT (BHU) Varanasi. Hop on!
        </p>
      </div>
      <div className='max-w-7xl mx-auto p-3 flex flex-col gap-4 py-8'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}