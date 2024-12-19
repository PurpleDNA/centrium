import FeedPost from "../../Home/FeedPost"
import guide from "../../../assets/guides.png"
import thread from "../../../assets/thread.png"
import "./slider.css"
import { Link } from "react-router-dom"

const Similar = () => {
  return (
    <div className="slide w-full -z-10">
      <div className="slider w-full flex gap-5 -z-10">
      {feed.map((post, index) => (
        <div key={index} className="w-[443x]">
          {
            post.postType === guide ? (
              <Link to="/guide">
              <FeedPost {...post} />
            </Link>
            ) : (
              <Link to="/post">
              <FeedPost {...post} />
            </Link>
            )
          }
        </div>
      ))}
      </div>
    </div>
  )
}
const feed: {
  username: string;
  date: string;
  title: string;
  demo: string;
  duration: number;
  postType: string;
}[] = [
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "Navigating writing and reading with Inkworth",
    demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and",
    duration: 4,
    postType: guide,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "Navigating writing and reading with Inkworth",
    demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "Navigating writing and reading with Inkworth",
    demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and",
    duration: 4,
    postType: guide,
  },
];


export default Similar
