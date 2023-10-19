
const CourseDetails = ({ course }) => {
  return (
    <div className="bg-white dark:bg-black rounded-lg p-8 border border-zinc-200 dark:border-zinc-800">
      <h1 className="text-xl font-bold text-black dark:text-white">
        Course Details
      </h1>
      <p className="text-zinc-800 dark:text-zinc-300">{course?.description}</p>
    </div>
  );
};

export default CourseDetails;
