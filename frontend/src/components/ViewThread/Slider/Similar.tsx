// import FeedPost from "../../Home/FeedPost";
import React from "react";
import guide from "../../../assets/guides.png";
import thread from "../../../assets/thread.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import "./slider.css";
import { Link } from "react-router-dom";
import SimilarPost from "./SimilarPost";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Similar = () => {
  // console.log("similar");
  const slider = React.useRef<Slider>(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="slide w-full -z-10">
      <div className="slider relative">
        <button
          className="prev p-1 bg-[#5C5C5C1A] rounded-full absolute z-10 top-1/2 left-2"
          onClick={() => {
            if (slider) {
              slider.current!.slickPrev();
            }
          }}
        >
          <ChevronLeft size={"16px"} />
        </button>
        <button
          className="next p-1 bg-[#5C5C5C1A] rounded-full absolute z-10 right-2 top-[50%]"
          onClick={() => {
            if (slider) {
              slider.current!.slickNext();
            }
          }}
        >
          <ChevronRight size={"16px"} />
        </button>
        <Slider ref={slider} {...settings}>
          {feed.map((post, index) => (
            <div key={index}>
              {post.postType === guide ? (
                <Link to="/guide">
                  <SimilarPost {...post} />
                </Link>
              ) : (
                <Link to="/post">
                  <SimilarPost {...post} />
                </Link>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
const feed: {
  username: string;
  date: string;
  title: string;
  demo?: string;
  duration: number;
  postType: string;
}[] = [
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and",
    duration: 4,
    postType: guide,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and",
    duration: 4,
    postType: thread,
  },
  {
    username: "The Rizz King",
    date: "31 jul 2024",
    title: "The Scalability Challenge in Web3 and How to Solve It",
    demo: "As a writer, you can share your literary works with a vibrant community, receiving feedback and",
    duration: 4,
    postType: guide,
  },
];

export default Similar;
