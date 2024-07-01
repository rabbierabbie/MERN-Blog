import {Footer} from 'flowbite-react';
import {Link} from 'react-router-dom';

export default function FooterCom() {
    return (
      <Footer container className='border border-t-4 border-blue-500'>
        <div className='w-full mx-auto'>
          <div className='grid w-full justify-between sm:flex md:grid-cols-1'>         
            <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>

            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.instagram.com/scs.iitbhu/?hl=en'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Instagram
                </Footer.Link>
                <Footer.Link href='https://in.linkedin.com/company/scs-iitbhu'>LinkedIn</Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='https://scs-iitbhu.notion.site/' target='_blank' rel='noopener noreferrer'>
                  SAKHA - Friend in Campus
                </Footer.Link>
                <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                  SCS's Blogs
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
          <div className='mt-5'>
              <Link
                to='/'
                className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
              >
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-blue-400 to-sky-300 rounded-lg text-white'>
                  SCS's Blogs
                </span>
              </Link>
            </div>
    </div>
          <Footer.Divider />
        <div className='sm:flex sm:items-center sm:justify-between w-full '>
          <Footer.Copyright href='#' by="SCS's blogs" year={new Date().getFullYear()}/>
        </div>
    </div>
</Footer>
);
}
