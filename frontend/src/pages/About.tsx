import React from 'react';
import about from '../assets/about.png'
import BlueButton from '../components/buttons/BlueButton';
import ContactForm from '../components/contect/ContactForm';

const About = () => {
  const Stats = [
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
    { count: "5K", label: "Students" },
  ];
  
  return ( 
  <>
  {/* top </div> */}
  <div>
  <section className='div-gradien'>
    <div className=' flex flex-col justify-center items-center'>
       <div className='max-w-[1100px] sm:my-[124px]  my-[100px] flex flex-col items-center gap-3'>
         
             <h1 className='text-[30px] font-bold text-gray-900 text-center' >A platform for next <span className='text-blue-600'>Generation of Learners </span>!</h1>
             <p className='text-center w-[80%] text-[15px] font-[500] text-gray-600 mt-5'>Air Scholar stands at the vanguard of revolutionizing online education, dedicated to sculpting a brighter future. We are fervently committed to delivering cutting-edge courses, harnessing emerging technologies, and fostering a vibrant learning community.</p>
       </div>
     </div>
    </section>
    <div className=' flex flex-col justify-center items-center'>
       <div className='max-w-[1100px]  flex flex-col items-center'>
          <img className=' sm:-mt-[100px] -mt-[80px] sm:w-[50%] w-[90%] object-fill' src={about} alt="image"  />
       </div>
     </div>
     <section className='bg-gray-700 my-8'>
     <div className=' flex flex-col justify-center items-center'>
       <div className='max-w-[1240px] w-11/12 '>
        <div className='flex flex-wrap gap-6 justify-between'>
       {Stats.map((data, index) => {
            return (
              <div className="flex flex-col py-10" key={index}>
                <h1 className="text-[30px] font-bold text-gray-200">
                  {data.count}
                </h1>
                <h2 className="font-semibold text-[16px] text-gray-200">
                  {data.label}
                </h2>
              </div>
            );
          })}
          </div>
       </div>
     </div>
     </section>
    

    <div className=' flex flex-col justify-center items-center'>
       <div className='max-w-[1100px]  mt-[45px] flex flex-col items-center gap-5'>
         
             <h1 className='sm:text-[30px] text-[25px] font-bold text-gray-900 text-center' >World-Class Learning for <span className='text-blue-600'>Anyone, Anywhere </span>!</h1>
             <p className='text-center w-[80%] text-[15px] font-[500] text-gray-600 '>Air Scholar partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
             <BlueButton text='Start now' />
       </div>
   
      <ContactForm heading={'Get In Touch'} text={"We'd love to here for you, Please fill out this form."} />
         
     </div>


  </div>

    </>
  );
}

export default About;
