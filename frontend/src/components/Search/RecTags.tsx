const RecTags = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold text-lg font-sofia">
        Recommended Tags For You
      </h2>
      <div className="flex flex-col gap-4">
        {recTags.map((rectag, i) => (
          <div key={i} className="flex flex-col cursor-pointer">
            <p className="text-sm text-slate-600 font-sofia">
              Trending in {rectag.trending}
            </p>
            <div className="flex justify-between">
              <h2 className="font-semibold text-lg">{rectag.username}</h2>
              <span className="text-slate-600">{rectag.postNo} posts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const recTags = [
  {
    trending: "Airdrops",
    username: "The Rizz King",
    postNo: "200",
  },
  {
    trending: "Airdrops",
    username: "The Rizz King",
    postNo: "200",
  },
  {
    trending: "Airdrops",
    username: "The Rizz King",
    postNo: "200",
  },
  {
    trending: "Airdrops",
    username: "The Rizz King",
    postNo: "200",
  },
  {
    trending: "Airdrops",
    username: "The Rizz King",
    postNo: "200",
  },
];

export default RecTags;
