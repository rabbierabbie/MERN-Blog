import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header(){
  const path=useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {currentUser}=useSelector((state)=>state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);{/**Very important */}
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit=async(e)=>{{/**Here e is required to use preventDefault */}
          e.preventDefault();
          const urlparams=new URLSearchParams(location.search);
          urlparams.set("searchTerm",searchTerm);
          const searchString=urlparams.toString();
          navigate(`/search?${searchString}`);
  };

  return (
    <Navbar className='border-b-2'>
       <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        <div className='flex gap-2 md:order-2'>
        {currentUser?(
         <Dropdown
         arrowIcon={true}
         inline
         label={
           <Avatar alt='current-user' img={currentUser.profilePicture} rounded />
         }
       >
         <Dropdown.Header>
           <span className='block text-md font-small truncate'>
           {currentUser.email}
           </span>
           <span className='block text-md font-small truncate'>@{currentUser.username}</span>
         </Dropdown.Header>
         <Link to={'/dashboard?tab=profile'}>
           <Dropdown.Item>Profile</Dropdown.Item>
         </Link>
         <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
       </Dropdown>
        ):
        (<Link to='/signin'>
          <Button gradientDuoTone='cyanToBlue' outline>Sign In</Button>
        </Link>
        )}
        <Navbar.Toggle />
      </div>

      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(ev)=>{setSearchTerm(ev.target.value)}}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className=' text-white px-4 py-2 bg-gradient-to-r rounded-lg from-indigo-600 via-blue-400 to-sky-300'>
          SCS's Blogs
        </span>
      </Link>      
      <Navbar.Collapse>
          <Navbar.Link active={path==='/'} as={'div'}>{/**We find here that Navbar.Link creates an anchor tag an so does Link tag. So we describe Navbar.Link as div*/}
            <Link to='/'>
                Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path==='/about'} as={'div'}>
            <Link to='/about'>
                About
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>     
    </Navbar>
  );
};
