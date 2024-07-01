////Here you have to deliberately call fetch posts as it is not the direct function to be passed in the arguments body.import { Modal, Table, Button } from 'flowbite-react';
//The useEffect Hook is a powerful tool in React that helps developers manage side effects in functional components. It runs asynchronously after the browser repaints the screen. This hook is commonly used for handling side effects such as fetching data, working with subscriptions, or interacting with the DOM.

//it returns a promise and useEffect doesn't expect the callback function to return Promise, rather it expects that nothing is returned or a function is returned.

//use a self invoking async function.

////table-auto used in the css below for the table adjusting according to its content on its own.
    //Overflow tailwind - Utilities for controlling how an element handles content that is too large for the container.

    import {Modal, Table, Button} from 'flowbite-react';
    import {useEffect, useState} from 'react';
    import {useSelector} from 'react-redux';
    import {Link} from 'react-router-dom';
    import {HiOutlineExclamationCircle} from 'react-icons/hi';
    
    export default function DashPosts() {
      const {currentUser} = useSelector((state) => state.user);

      const [userPosts, setUserPosts] = useState([]);
      const [showMore, setShowMore] = useState(true);
      const [showModal, setShowModal] = useState(false);
      const [postIdToDelete, setPostIdToDelete] = useState('');

      useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
            const data = await res.json();
            if (res.ok) {
              setUserPosts(data.posts);
              console.log("Hey there"+data.posts.length);
              if (data.posts.length < 9) {
                setShowMore(false);
              }
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        if (currentUser.isAdmin) {
          fetchPosts(); // To be written separately here
        }
      }, [currentUser._id]);
    
      const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
          const res = await fetch(
            `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
          );
          const data = await res.json();
          if (res.ok) {
            setUserPosts((prev) => [...prev, ...data.posts]); // spread operator used
            if (data.posts.length < 3) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    
      const handleDeletePost = async () => {
        setShowModal(false);
        try {
          const res = await fetch(
            `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
            {
              method: 'DELETE',
            }
          );
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            setUserPosts((prev) =>
              prev.filter((post) => post._id !== postIdToDelete)
            );
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      //console.log(currentUser.isAdmin);
     // console.log(userPosts.length);
      return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
          {currentUser.isAdmin && userPosts.length > 0 ? (
            <>
              <Table hoverable className='shadow-md'>
                <Table.Head>
                  <Table.HeadCell>Post image</Table.HeadCell>
                  <Table.HeadCell>Post title</Table.HeadCell>
                  <Table.HeadCell>Date updated</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                  <Table.HeadCell>
                    <span>Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                {userPosts.map((post) => (
                  <Table.Body className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className='w-20 h-10 object-cover bg-gray-500'
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className='font-medium text-gray-900 dark:text-white'
                          to={`/post/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setPostIdToDelete(post._id);
                          }}
                          className='font-medium text-red-500 hover:underline cursor-pointer'
                        >
                          Delete
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className='text-teal-500 hover:underline'
                          to={`/update-post/${post._id}`}>
                          <span>Edit</span>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className='w-full text-teal-500 self-center text-sm py-7'
                >
                  Show more
                </button>
              )}
            </>
          ) : (
            <p>You have no posts!</p>
          )}
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size='md'
          >
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                  Are you sure you wish to delete this post?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={handleDeletePost}>
                    Yes, I am sure
                  </Button>
                  <Button color='gray' onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    }