import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCourseDetail } from '../api/api-function/coures-api';
import ReactStars from 'react-stars';
import { BiInfoCircle } from 'react-icons/bi';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import {  PiShareNetworkFill } from 'react-icons/pi';
import { buyCourse } from '../api/api-function/payment-api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/Store';
import { addToCart } from '../redux/slice/cartSlice';

const CourseDetail = () => {
    const courseId = useParams();
    const [course , setcourse] = useState<any>();
    const {token } = useSelector((state:RootState)=>state.auth);
    const {User} = useSelector((state:RootState)=>state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchCourseDetail = async()=>{
        const res = await getCourseDetail(courseId.id);
        setcourse(res);
        console.log(User);
        
        
    }
    useEffect(()=>{
      fetchCourseDetail();
    },[])

    const buyCourseHandler = async()=>{
      await buyCourse([courseId.id],token,User,dispatch,navigate);
    }

 if (course) {
    return (
      <div className=" overflow-hidden ">
        <div
          className={` flex justify-center bg-opacity-20 items-center mb-[70px] mt-[70px]`}
        >
          {/* Hero Section */}
          <div className="w-[1160px] flex justify-between relative">
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-7 py-5 text-lg text-gray-800 mt-14`}
            >
              <div>
                <p className="text-4xl font-bold text-gray-800 sm:text-[34px]">
                  {course.couresName}
                </p>
              </div>
              <p className={`text-gray-600 font-[600] text-[20px]`}>
                {course.courseDescription}
              </p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-400">{"avgReviewCount"}</span>
                <ReactStars count={5} edit={false} />
                <span>{`(${course.ratingAndReviews.length} reviews)`}</span>
                <span>{`${course.studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="text-[18px] text-slate-600 font-[600]">
                  Created By{" "}
                  <span className="font-[700]">{`${course.instructor.firstName} ${course.instructor.lastName}`}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-5  text-slate-600">
                <p className="flex items-center text-[16px] font-[600] gap-2">
                  {" "}
                  <BiInfoCircle className="text-[21px] " /> Created at{" "}
                  {new Date(course.createdAt).toString().slice(0, 15)}
                </p>
                <p className="flex items-center gap-2 text-[16px] font-[600]">
                  {" "}
                  <HiOutlineGlobeAlt className="text-[21px]" /> English
                </p>
              </div>
            </div>
            <div>
              <div className=" absolute  right-1 border w-[400px] overflow-hidden rounded-[13px] border-gray-400 border-opacity-50 bg-blue-100  shadow-2xl">
                <div className="w-[400px]">
                  <img
                    src={course.thumbnail}
                    className="w-full h-full"
                    alt="course thumbnail"
                  />
                </div>
                <div className="flex flex-col gap-3 p-[12px]">
                  <div className="flex justify-between">
                    <p className="text-[20px] font-[600]"> ₹ {course.price}</p>
                    <div className="flex flex-row gap-1 items-center font-[700] text-blue-600">
                      <p className="text-[16px] font-bold">share</p>
                      <PiShareNetworkFill className="text-[16px]" />
                    </div>
                  </div>
                  <div className="text-gray-700">
                    By{" "}
                    <span className="font-[600]">
                      {" "}
                      {course.instructor.firstName} {course.instructor.lastName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {course.studentsEnrolled.includes(User?._id) ? (
                      <>
                        <div className="font-[500] text-gray-600">
                          You are already enrolled in this course.
                        </div>
                        <Link to={'/viewCourse/'+course._id}  >
                          <button className="bg-blue-500 w-full py-3 hover:shadow-md hover:shadow-blue-300 duration-500  rounded-[20px] text-[17px] font-[600] text-white">
                            view course
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-blue-500 py-3 hover:shadow-md hover:shadow-blue-300 duration-500   rounded-[20px] text-[17px] font-[600] text-white"
                          onClick={() => buyCourseHandler()}
                        >
                          buy now
                        </button>
                        <button
                          onClick={() => dispatch(addToCart(course))}
                          className="bg-blue-500 py-3 hover:shadow-md hover:shadow-blue-300 duration-500  rounded-[20px] text-[17px] font-[600] text-white"
                        >
                          add to cart
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1160px]">
          <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[700px]">
            {/* What will you learn section */}
            <div className="my-8 border border-gray-400 bg-blue-50 bg-opacity-50 p-8">
              <p className="text-3xl font-semibold">What you'll learn</p>
              <div className="mt-5">{course.whatYouWillLearn}</div>
            </div>

            {/* Course Content Section */}
            <div className="max-w-[830px] ">
              <div className="flex flex-col gap-3 mt-10">
                <p className="text-[28px] font-semibold text-gray-800">
                  Course Content
                </p>
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex gap-2">
                    <span>
                      {course.courseContent.length} {`section(s)`}
                    </span>
                    <span>
                      {"totalNoOfLectures"} {`lecture(s)`}
                    </span>
                    <span>{"response.data?.totalDuration"} total length</span>
                  </div>
                </div>
              </div>

              {/* Course Details Accordion */}

              {/* Author Details */}
              <div className="mb-12 py-4">
                <p className="text-[28px] font-semibold">Author</p>
                <div className="flex items-center gap-4 py-4">
                  <img
                    src={
                      course.instructor.image
                        ? course.instructor.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${course.instructor.firstName} ${course.instructor.lastName}`
                    }
                    alt="Author"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <p className="text-lg">{`${course.instructor.firstName} ${course.instructor.lastName}`}</p>
                </div>
                <p className="text-richblack-50">
                  {course.instructor?.additionalDetails?.about}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );  
 }
}

export default CourseDetail;
