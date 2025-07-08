import React from "react";

const Newsletter = () => {
  return (
    <div className="mx-4 flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl font-semibold ">Never miss a Blog</h1>
      <p className="pb-8 text-gray-500/70 text-sm md:text-lg">
        Subscribe to get the latest blog, new tech,and exclusive news.
      </p>
      <form className="flex justify-center items-center max-w-2xl w-full h-11 md:h-13">
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="px-8 md:px-12 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe!
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
