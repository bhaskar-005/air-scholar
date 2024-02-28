import React, { useEffect } from 'react';
import { getAllCourses } from '../api/api-function/coures-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/Store';
import CourseCard from '../components/home/CourseCard';
import Loading from '../components/Loading';

const Courses = () => {
  const dispatch = useDispatch();
  const{course} = useSelector((state:RootState)=> state.course)
  const{loading} = useSelector((state:RootState)=> state.auth)
  const getCourse = async()=>{
    await getAllCourses(dispatch);
  }
  useEffect(()=>{
   if (!course) {
     getCourse();
   }
  },[])
  
  if (loading) {
    return <Loading/>
  }
  return (
    <div className=' flex justify-center'>
    <div className= ' max-w-[1200px] my-[80px] flex flex-row sm:gap-5 gap-2 flex-wrap justify-center items-center'>
       
     {
        course?.map((data:any)=>(
            <CourseCard
            actualPrice={data?.actualPrice ? data.actualPrice : null}
            key={data._id}
            id={data._id} 
            image={data.thumbnail}
            title={data.couresName}
            instructor={`${data.instructor.firstName} ${data.instructor.lastName}`}
            price={data.price}
            enrolled={`${data.ratingAndReviews.length}`}
            />
        ))
     }

    </div>
    </div>
  );
}

export default Courses;
