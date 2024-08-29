import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col-reverse mx-16 md:flex-row my-16 justify-around items-center gap-8">
      <div className="text-white text-center w-full md:w-[50%]  md:text-left mt-8 md:mt-0">
        <h1 className="text-4xl font-bold"><span className=' text-[#FC0254] ' >Listen</span> to new Music.</h1>
        <p className="text-md mt-4">Discover and enjoy the latest hits, albums, and playlists tailored just for you. Immerse yourself in a world of sound, rhythm, and melody.</p>
        <Link href={'/profile'} ><button className='p-4 rounded-full mt-6 bg-[#FC0254] text-white uppercase' >Start Free Trial</button></Link>
      </div>
      <div className="flex justify-center">
        <Image
          src="https://res.cloudinary.com/dywhcxdix/image/upload/v1724870933/oa0v9asfyhmbx9vyjlgj.png"
          alt="hero-img"
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default About;
