import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function FooterCom() {
    return (
      <Footer container className='border border-t-8 border-blue-500'>
        <div className='w-full max-w-7xl mx-auto'>
          <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
              <Link
                to='/'
                className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
              >
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-blue-400 to-sky-300 rounded-lg text-white'>
                  SCS's
                </span>
                Blog
              </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://scs-iitbhu.notion.site/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  SAKHA - Friend in Campus
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  SCS's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
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
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
    </div>
          <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="SCS's blog"
            year={new Date().getFullYear()}
          />
        </div>
    </div>
</Footer>
);
}
