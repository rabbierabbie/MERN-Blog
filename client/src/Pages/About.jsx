export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About SCS's Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome! This blogging platform was created by Shreya Srivastava to share the thoughts and ideas of the members of the Student Counselling Services, IIT (BHU) Varanasi.
            </p>

            <p>
              Here you will find about all the ongoing activities of SAKHA - Your Friend in Campus. Do keep visiting!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}