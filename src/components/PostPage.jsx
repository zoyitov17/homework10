import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { editPost } from "../featuries/postsSlice";
import api from "../api";

const PostPage = ({ posts, handleDelete, navigate, edit, setEdit }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  const [Title, setTitle] = useState("");
  const [Body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      await api.patch(`/posts/${id}`, { title: Title, body: Body });
      dispatch(editPost({ ...post, title: Title, body: Body }));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            {edit ? (
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <input
                  style={{
                    padding: "10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  required
                  type="text"
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  name=""
                  id="postBody"
                  required
                  rows="10"
                  value={Body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </form>
            ) : (
              <div>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
                <p className="postBody">{post.body}</p>
              </div>
            )}
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => handleDelete(post.id)}>Delete Post</button>

              <button
                onClick={() => {
                  if (edit) {
                    handleSave();
                    navigate("/");
                  }

                  setEdit(!edit);
                }}
                style={{ backgroundColor: "green" }}
              >
                {edit ? "save" : "edit"}
              </button>

              <button
                style={{ backgroundColor: "gray" }}
                onClick={() => navigate(-1)}
              >
                cancel
              </button>
            </div>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
