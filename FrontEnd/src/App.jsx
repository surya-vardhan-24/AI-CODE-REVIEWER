import { useState ,useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import './App.css'
import axios from 'axios';
import Markdown from 'react-markdown';

function App() {
  const [code, setCode] = useState(`
    function sum(){
    return 1+2;
    }`)

    const [review,setReview] = useState("");



  useEffect(()=>{
    prism.highlightAll();
  },[])

  async function reviewCode(){
    try{
      const response = await axios.post("http://localhost:3000/ai/get-review",{code});
      setReview(response.data.response);
    }catch(err){
      console.error("Error reviewing code:",err);
      setReview("Error reviewing code. Please try again.");
    }
  }
  return (
  <>
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              border: "1px solid #555",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <div onClick={reviewCode} className="review">
          REVIEW
        </div>
      </div>

      <div className="right">
        <Markdown>{review}</Markdown>
      </div>
    </main>

    {/* 🔻 Footer Section */}
    <footer
      style={{
        marginTop: "1rem",
        padding: "1rem",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        fontSize: "14px",
        color: "#444",
      }}
    >
      <p>Developed by <strong>SURYA VARDHAN KOMMULA</strong></p>
      <div style={{ marginTop: "0.5rem" }}>
        <a
          href="https://www.linkedin.com/in/suryavardhan-kommula-8aa599249/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#0a66c2", textDecoration: "none" }}
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/surya-vardhan-24"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#333", textDecoration: "none" }}
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/your-twitter"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#1DA1F2", textDecoration: "none" }}
        >
          Twitter
        </a>
      </div>
    </footer>
  </>
);

}

export default App
