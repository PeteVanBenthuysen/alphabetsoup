import { useEffect, useState } from "react";

const substackList = [
  {
    name: "Silver Bulletin",
    url: "https://www.natesilver.net/",
    image: "https://www.natesilver.net/favicon.ico",
    author: "Nate Silver",
    feed: "https://www.natesilver.net/feed",
    tags: ["Data Science", "Politics",],
  },
  {
    name: "The F5",
    url: "https://thef5.substack.com/",
    image: "https://thef5.substack.com/favicon.ico",
    author: "Owen Phillips",
    feed: "https://thef5.substack.com/feed",
    tags: ["Sports", "Data Visualization"],
  },
  {
    name: "The Science of Hitting",
    url: "https://thescienceofhitting.com/",
    image: "https://thescienceofhitting.com/favicon.ico",
    author: "Alex Morris",
    feed: "https://thescienceofhitting.com/feed",
    tags: ["Finance", "Investing"],
  },
  {
    name: "Investment Talk",
    url: "https://investmenttalk.substack.com/",
    image: "https://investmenttalk.substack.com/favicon.ico",
    author: "Investment Talk",
    feed: "https://investmenttalk.substack.com/feed",
    tags: ["Finance", "Investing"],
  },
  {
    name: "The Diff",
    url: "https://thediff.co/",
    image: "https://thediff.co/favicon.ico",
    author: "Byrne Hobart",
    feed: "https://thediff.co/feed",
    tags: ["Finance", "Economics", "Tech"],
  },
  {
    name: "Net Interest",
    url: "https://netinterest.substack.com/",
    image: "https://netinterest.substack.com/favicon.ico",
    author: "Marc Rubinstein",
    feed: "https://netinterest.substack.com/feed",
    tags: ["Finance", "Economics"],
  },
  {
    name: "The Overshoot",
    url: "https://theovershoot.co/",
    image: "https://theovershoot.co/favicon.ico",
    author: "Matthew C. Klein",
    feed: "https://theovershoot.co/feed",
    tags: ["Economics", "Finance"],
  },
  {
    name: "The Rational Walk",
    url: "https://rationalwalk.substack.com/",
    image: "https://rationalwalk.substack.com/favicon.ico",
    author: "Ravi Nagarajan",
    feed: "https://rationalwalk.substack.com/feed",
    tags: ["Finance", "Investing", "Math"],
  },
  {
    name: "Data Elixir",
    url: "https://dataelixir.com/",
    image: "https://dataelixir.com/favicon.ico",
    author: "Lon Riesberg",
    feed: "https://dataelixir.com/feed",
    tags: ["Data Science", "Machine Learning", "Tech"],
  },
  {
    name: "Andrew Ng’s The Batch",
    url: "https://www.deeplearning.ai/thebatch/",
    image: "https://www.deeplearning.ai/favicon.ico",
    author: "Andrew Ng",
    feed: "https://www.deeplearning.ai/thebatch/feed.xml",
    tags: ["Data Science", "AI", "Machine Learning"],
  },
  {
    name: "FlowingData",
    url: "https://flowingdata.com/",
    image: "https://flowingdata.com/favicon.ico",
    author: "Nathan Yau",
    feed: "https://flowingdata.com/feed/",
    tags: ["Data Visualization", "Statistics", "Data Science"],
  },
  {
    name: "EvanMiya.com",
    url: "https://blog.evanmiya.com/",
    image: "https://blog.evanmiya.com/favicon.ico",
    author: "Evan Miyakawa",
    feed: "https://blog.evanmiya.com/feed.xml",
    tags: ["Sports", "Statistics", "Data Visualization"],
  },
  {
    name: "FILWD",
    url: "https://filwd.substack.com/",
    image: "https://filwd.substack.com/favicon.ico",
    author: "FILWD",
    feed: "https://filwd.substack.com/feed",
    tags: ["Data Visualization", "Tech", "AI"],
  },
  {
    name: "Foreign Exchanges",
    url: "https://www.foreignexchanges.news/",
    image: "https://www.foreignexchanges.news/favicon.ico",
    author: "Derek Davison",
    feed: "https://www.foreignexchanges.news/feed",
    tags: ["Economics", "Geopolitics", "International Relations"],
  },
  {
    name: "PolicyViz",
    url: "https://jschwabish.substack.com/",
    image: "https://jschwabish.substack.com/favicon.ico",
    author: "Jonathan Schwabish",
    feed: "https://jschwabish.substack.com/feed",
    tags: ["Data Visualization", "Politics"],
  },
  {
    name: "Lucky Maverick",
    url: "https://luckymaverick.substack.com/",
    image: "https://luckymaverick.substack.com/favicon.ico",
    author: "Johnathan Bales",
    feed: "https://luckymaverick.substack.com/feed",
    tags: ["Finance", "Sports"],
  },
  {
    name: "Exponential View",
    url: "https://www.exponentialview.co/",
    image: "https://www.exponentialview.co/favicon.ico",
    author: "Azeem Azhar",
    feed: "https://www.exponentialview.co/feed",
    tags: ["AI", "Economics", "Geopolitics"],
  },
  // Add more substacks here
];

function Reads() {
  const [latestPosts, setLatestPosts] = useState({});
  const [selectedTag, setSelectedTag] = useState(null);

  // Collect all unique tags
  const allTags = Array.from(
    new Set(substackList.flatMap(substack => substack.tags || []))
  );

  // Filter substacks by selected tag
  const filteredList = selectedTag
    ? substackList.filter(substack => substack.tags?.includes(selectedTag))
    : substackList;

  useEffect(() => {
    async function fetchLatest() {
      const fetches = substackList.map(async (substack) => {
        try {
          const res = await fetch(
            `https://ilnvf97s6d.execute-api.us-east-2.amazonaws.com/default/UpdatedSubstack?url=${encodeURIComponent(substack.feed)}`
          );
          const xmlText = await res.text();
          const parser = new window.DOMParser();
          const xml = parser.parseFromString(xmlText, "text/xml");
          const item = xml.querySelector("item");
          if (item) {
            return [
              substack.url,
              {
                title: item.querySelector("title")?.textContent,
                link: item.querySelector("link")?.textContent,
              },
            ];
          }
        } catch (e) {
          // ignore
        }
        return [substack.url, { title: "Could not fetch", link: "#" }];
      });

      const resultsArr = await Promise.all(fetches);
      const results = Object.fromEntries(resultsArr);
      setLatestPosts(results);
    }
    fetchLatest();
  }, []);

  // Blue-gray color for headings and tags
  const blueGray = "#4F6D7A";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#C0D6DF] text-[#4F6D7A] text-center font-sans">
      <h1 className="text-3xl font-semibold mb-4 tracking-wide text-[#4F6D7A]">
        Reads & Recommendations
      </h1>
      <p className="max-w-xl mb-6 text-lg font-normal text-[#4F6D7A]">
        Here is a curated selection of newsletters and resources I highly recommend.
      </p>
      {/* Tag filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full border font-semibold ${
            selectedTag === null
              ? "bg-[#DD6E42] text-white"
              : "border-[#DD6E42] text-[#DD6E42] bg-transparent"
          }`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full border font-semibold ${
              selectedTag === tag
                ? "bg-[#DD6E42] text-white"
                : "border-[#DD6E42] text-[#DD6E42] bg-transparent"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredList.map((substack) => (
          <div
            key={substack.url}
            className="bg-[#F4F4F9]/80 rounded-lg shadow p-4 flex flex-col justify-between min-h-[120px] min-w-[340px] max-w-full"
          >
            <div className="flex flex-row w-full">
              {substack.image ? (
                <img
                  src={substack.image}
                  alt={`${substack.name} logo`}
                  className="w-12 h-12 rounded mr-4 flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded bg-[#DD6E42] text-white flex items-center justify-center mr-4 text-xl font-bold flex-shrink-0">
                  {substack.name[0]}
                </div>
              )}
              <div className="flex flex-col justify-start items-start">
                <span className="text-xl font-semibold text-[#DD6E42]">{substack.name}</span>
                <span className="text-sm font-semibold text-[#DD6E42]">{`by ${substack.author}`}</span>
                {/* Render tags for each substack */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {substack.tags &&
                    substack.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-[#DD6E42]/10 text-[#DD6E42] text-xs font-semibold border border-[#DD6E42]"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-end mt-6 w-full gap-2">
              <div className="flex-1 flex justify-start min-w-0">
                {latestPosts[substack.url] ? (
                  <a
                    href={latestPosts[substack.url].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1 border border-[#DD6E42] rounded-full text-[#DD6E42] text-xs tracking-wide uppercase bg-transparent hover:bg-[#DD6E42] hover:text-white transition font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-[170px]"
                    title={latestPosts[substack.url].title}
                  >
                    {latestPosts[substack.url].title}
                  </a>
                ) : (
                  <span className="px-4 py-1 border border-[#DD6E42] rounded-full text-[#DD6E42] text-xs tracking-wide uppercase bg-transparent font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-[170px]">
                    {latestPosts[substack.url]?.title || "Loading..."}
                  </span>
                )}
              </div>
              <a
                href={substack.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1 border border-[#DD6E42] rounded-full text-[#DD6E42] text-xs tracking-wide uppercase bg-transparent hover:bg-[#DD6E42] hover:text-white transition font-semibold ml-2"
              >
                Follow
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reads;