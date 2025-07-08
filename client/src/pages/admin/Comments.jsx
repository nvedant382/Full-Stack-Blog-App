import { useEffect, useState } from "react";
import { comments_data } from "../../assets/assets";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Approved");

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");

      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-100/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`cursor-pointer px-4 py-2 text-xs rounded-full border shadow-custom-sm ${
              filter === "Approved" ? "bg-primary text-white" : "text-gray-700"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`cursor-pointer px-4 py-2 text-xs rounded-full border shadow-custom-sm ${
              filter === "Not Approved"
                ? "bg-primary text-white"
                : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative min-h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="py-6 px-3">
                Blog Title <span className="h-2 p-1 md:p-2 text-black">|</span>{" "}
                Comment
              </th>
              <th scope="col" className="py-6 px-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="py-6 px-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
