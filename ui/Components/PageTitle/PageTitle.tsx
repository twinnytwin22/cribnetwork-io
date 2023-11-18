function PageTitle({ title }) {
  return (
    <div className=" px-10 mx-auto w-full">
      <h1 className="font-owners font-semibold text-3xl text-black dark:text-white">
        {title}
      </h1>
    </div>
  );
}

export default PageTitle;
