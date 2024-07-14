import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import { Routes, useNavigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "./api";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost, fetchPost } from "./featuries/postsSlice";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/posts");
        dispatch(fetchPost(response.data))
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try {
      const response = await api.post("posts", newPost);
      dispatch(addPost(response.data));
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    navigate("/");
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          path="/post/:id"
          element={
            <PostPage
              posts={posts}
              handleDelete={handleDelete}
              navigate={navigate}
              edit={edit}
              setEdit={setEdit}
            />
          }
        />
        <Route path="/about" component={<About />} />
        <Route path="*" component={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
