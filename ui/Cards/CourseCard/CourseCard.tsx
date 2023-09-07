const myStyle = {
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  };
  //for create avatar as name
  const myFun = (myName: string) => {
    const data = myName.toUpperCase().split(" ");
    const avatarName = data.map((data) => data.charAt(0));
    return avatarName;
  };
  //JSON to generate a dummy database
  const apiData = [
    {
      category: "Lorem, ipsum dolor.",
      title:
        " Lorem ipsum dolor sit, amet consectetur adipisicing",
      date: new Date().toDateString(),
      location: "Iscon, Ahmedabad",
      subCategory: "Ocean",
      price: "Free",
      image:
        "https://www.tailwindtap.com/assets/components/scale-effect-card/flower.jpg",
      name: "infynno solution",
    },
  
  ];
  const CourseCard = ({course}) => {
    console.log(course)

    
    return (
        <div className="w-full max-w-sm">
          {/* card grid */}
          {apiData.map((data, index) => (
            <div
              className="border border-zinc-300 dark:border-zinc-800 rounded-lg hover:drop-shadow-md overflow-hidden relative bg-white dark:bg-black"
              key={index}
            >
              {/* image and avatar block */}
              <div className="cursor-pointer h-48 overflow-hidden">
                <img
                  src={data.image}
                  alt="Profile image for particular category"
                  sizes="300px"
                  className="w-full h-full hover:scale-125 delay-200 duration-300 ease-in-out"
                />
                <span className="absolute top-4 right-4 w-8 h-8 items-center bg-zinc-100 dark:bg-zinc-800 flex justify-center rounded-full text-zinc-900 dark:text-zinc-100">
                  {data.name && myFun(data.name)}
                </span>
              </div>
              {/* card fields section  */}
              <div className="p-4 space-y-2 relative h-60 text-zinc-400 dark:text-zinc-400">
                <div>
                  <p className="text-sm font-bold truncate">{data.category}</p>
                </div>
                <div>
                  <span className="text-xl font-bold text-zinc-600 dark:text-zinc-200 overflow-hidden h-12">
                    {course?.title}
                  </span>
                </div>
                <div className="flex gap-2 items-center text-zinc-500 dark:text-zinc-100">
                  <CategoryIcon />
                  <span className="text-sm font-normal">{data.subCategory}</span>
                </div>
                <div className="flex gap-2 items-center text-zinc-500 dark:text-zinc-100">
                  <DateIcon />
                  <span className="text-sm font-normal">{data.date}</span>
                </div>
                <div className="flex gap-2 justify-start items-center text-zinc-500 dark:text-zinc-100">
                  <LocationIcon />
                  <span className="text-sm font-normal">{data.location}</span>
                </div>
                {/* fix bottom section */}
                <div className="bottom-2 absolute inset-x-0">
                  <div className="border-t mt-2 mb-2 border-zinc-300 dark:border-zinc-800"></div>
                  <span className="text-xl text-zinc-600 dark:text-zinc-200 pl-4">
                    {data.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
      };
      
  
  export default CourseCard;
  const CategoryIcon = () => (
    <svg
      stroke="zinc"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 4h6v6h-6z"></path>
      <path d="M14 4h6v6h-6z"></path>
      <path d="M4 14h6v6h-6z"></path>
      <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
    </svg>
  );
  const DateIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 2048 2048"
    >
      <path
        fill="zinc"
        d="M1792 993q60 41 107 93t81 114t50 131t18 141q0 119-45 224t-124 183t-183 123t-224 46q-91 0-176-27t-156-78t-126-122t-85-157H128V128h256V0h128v128h896V0h128v128h256v865zM256 256v256h1408V256h-128v128h-128V256H512v128H384V256H256zm643 1280q-3-31-3-64q0-86 24-167t73-153h-97v-128h128v86q41-51 91-90t108-67t121-42t128-15q100 0 192 33V640H256v896h643zm573 384q93 0 174-35t142-96t96-142t36-175q0-93-35-174t-96-142t-142-96t-175-36q-93 0-174 35t-142 96t-96 142t-36 175q0 93 35 174t96 142t142 96t175 36zm64-512h192v128h-320v-384h128v256zM384 1024h128v128H384v-128zm256 0h128v128H640v-128zm0-256h128v128H640V768zm0 512h128v128H640v-128zm384-384H896V768h128v128zm256 0h-128V768h128v128zM384 768h128v128H384V768z"
      />
    </svg>
  );
  const LocationIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 24 24"
    >
      <path
        fill="zinc"
        d="M12 12q.825 0 1.413-.588T14 10q0-.825-.588-1.413T12 8q-.825 0-1.413.588T10 10q0 .825.588 1.413T12 12Zm0 7.35q3.05-2.8 4.525-5.088T18 10.2q0-2.725-1.738-4.462T12 4Q9.475 4 7.737 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35Zm0 2.275q-.2 0-.4-.075t-.35-.2Q7.6 18.125 5.8 15.362T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 2.4-1.8 5.163t-5.45 5.987q-.15.125-.35.2t-.4.075ZM12 10.2Z"
      />
    </svg>
  );
  