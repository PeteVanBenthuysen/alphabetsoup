import { useEffect, useState } from "react";

const substackList = [
  {
    name: "Every",
    url: "https://every.to/",
    image: "https://every.to/favicon.ico",
    author: "Dan Shipper",
    feed: "https://every.to/feed",
  },
  {
    name: "Silver Bulletin",
    url: "https://www.natesilver.net/",
    image: "https://www.natesilver.net/favicon.ico",
    author: "Nate Silver",
    feed: "https://www.natesilver.net/feed",
  },
  // Add more substacks here
];

function Reads() {
  const [latestPosts, setLatestPosts] = useState({});

  useEffect(() => {
    async function fetchLatest() {
      const results = {};
      for (const substack of substackList) {
        try {
          const res = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(substack.feed)}`
          );
          const data = await res.json();
          const parser = new window.DOMParser();
          const xml = parser.parseFromString(data.contents, "text/xml");
          const item = xml.querySelector("item");
          if (item) {
            results[substack.url] = {
              title: item.querySelector("title")?.textContent,
              link: item.querySelector("link")?.textContent,
            };
          }
        } catch (e) {
          results[substack.url] = { title: "Could not fetch", link: "#" };
        }
      }
      setLatestPosts(results);
    }
    fetchLatest();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#C0D6DF] text-[#4F6D7A] text-center">
      <h1 className="text-3xl font-semibold mb-4 tracking-wide">Reads & Recommendations</h1>
      <p className="max-w-xl mb-6 text-lg">
        Here are some Substack newsletters and books I recommend!
      </p>
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {substackList.map((substack) => (
          <div
            key={substack.url}
            className="bg-white/80 rounded-lg shadow p-6 flex flex-col items-start text-left"
          >
            {substack.image && (
              <img
                src={substack.image}
                alt={`${substack.name} logo`}
                className="w-12 h-12 mb-3 rounded"
              />
            )}
            <div className="mb-2">
              <span className="text-xl font-semibold text-[#DD6E42]">{substack.name}</span>
            </div>
            <span className="text-sm text-[#6A4E42] mb-2">by {substack.author}</span>
            <div className="mb-4">
              <span className="text-[#4F6D7A]">Latest: </span>
              {latestPosts[substack.url] ? (
                <a
                  href={latestPosts[substack.url].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1 border border-[#DD6E42] rounded-full text-[#DD6E42] text-sm tracking-wide uppercase bg-transparent hover:bg-[#DD6E42] hover:text-white transition"
                >
                  {latestPosts[substack.url].title}
                </a>
              ) : (
                <span className="px-4 py-1 border border-[#DD6E42] rounded-full text-[#DD6E42] text-sm tracking-wide uppercase bg-transparent">
                  Loading...
                </span>
              )}
            </div>
            <a
              href={substack.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto px-4 py-1 border border-[#DD6E42] rounded-full text-[#DD6E42] text-sm tracking-wide uppercase bg-transparent hover:bg-[#DD6E42] hover:text-white transition"
            >
              Follow
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reads;