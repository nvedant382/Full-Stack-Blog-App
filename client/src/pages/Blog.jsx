import React, { useState, useEffect } from "react";
import { assets, blog_data, comments_data } from "../assets/assets";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios, user } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/blog/comments", {
        params: { blogId: id },
      });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      {
        console.log("Problem here");
      }
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });

      if (data.success) {
        toast.success(data.message);
        setContent("");
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setName(user ? user.name : name);
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published On: {Moment(data.createdAt).format("Do MMMM YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2
          className="my-5 max-w-lg truncate mx-auto"
          dangerouslySetInnerHTML={{ __html: data.subTitle }}
        ></h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          by ~
          {user && data.owner._id === user.id ? (
            <span className="text-green-600">YOU</span>
          ) : (
            data.owner.name
          )}
        </p>
      </div>
      <div className="mx-5 max-w-2xl md:max-w-3xl lg:max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />

        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
      </div>
      {/* Show Comments */}
      <div className="mt-14 mb-10 max-w-3xl mx-auto max-md:m-6">
        <p className="font-semibold mb-4">Comments ({comments.length})</p>
        <div className="flex flex-col gap-6">
          {comments.map((item, index) => (
            <div
              key={index}
              className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={assets.user_icon} alt="" className="w-6" />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="text-sm ml-8 max-w-lg">{item.content}</p>

              <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                {Moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*Add Comment Section*/}
      <div className="max-w-3xl mx-auto m-4 max-md:m-5">
        <p className="font-semibold mb-4">Add Your Comment</p>

        <form
          onSubmit={addComment}
          className="flex flex-col item-start gap-5 max-w-lg"
        >
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full p-3 border border-gray-300 rounded outline-none"
            onChange={(e) => setName(e.target.value)}
            value={user ? user.name : name}
            disabled={!!user}
          />

          <textarea
            placeholder="Comment"
            className=" resize-none w-full p-2 border border-gray-300 rounded outline-none h-48"
            required
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>

          <button
            type="submit"
            className="self-start text-center bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
      {/*Share Button*/}
      <div className="mx-auto max-w-3xl my-24 max-md:text-center">
        <p className="font-semibold my-4">Share this article on social media</p>
        <div className="flex max-md:justify-center">
          <img src={assets.facebook_icon} width={50} alt="" />
          <img src={assets.twitter_icon} width={50} alt="" />
          <img src={assets.googleplus_icon} width={50} alt="" />
        </div>
      </div>
      <Footer />;
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
