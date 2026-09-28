import { useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://dummyjson.com/posts?limit=10"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (err) {
      setError("Unable to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <p className="api-label">AJAX / FETCH API</p>

        <h1>Post Explorer</h1>

        <p className="subtitle">
          Fetch and display posts from a public API using React and fetch().
        </p>

        <button
          className="fetch-button"
          onClick={fetchPosts}
          disabled={loading}
        >
          <span className="refresh-icon">↻</span>
          {loading ? "Loading..." : "Fetch Posts"}
        </button>
      </header>

      {/* Error */}
      {error && <div className="error">{error}</div>}

      {/* Loading */}
      {loading && (
        <div className="loading">
          Loading posts...
        </div>
      )}

      {/* Posts */}
      <main className="posts-container">
        {posts.map((post, index) => (
          <article className="post-card" key={post.id}>

            <div className="card-top">
              <div className="quote-icon">“</div>

              <div className="post-number">
                #{index + 1}
              </div>
            </div>

            <h2>{post.title}</h2>

            <p className="post-body">
              {post.body}
            </p>

            <div className="card-footer">
              <span>👍 {post.reactions.likes}</span>
              <span>👎 {post.reactions.dislikes}</span>
            </div>

          </article>
        ))}
      </main>

    </div>
  );
}

export default App;