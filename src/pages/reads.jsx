function Reads() {
    return (
      <div className="min-h-screen bg-[#C0D6DF] text-[#4F6D7A] px-6 py-16 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 tracking-wide text-[#DD6E42]">Reads & Recommendations</h1>
        <p className="mb-8 max-w-2xl text-lg text-center">
          Here are some books and Substack articles I recommend, plus my own Substack!
        </p>
        <div className="w-full max-w-xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-[#DD6E42] mb-2">Books</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <a
                  href="https://www.goodreads.com/book/show/25666050-deep-work"
                  className="underline hover:text-[#DD6E42]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Deep Work by Cal Newport
                </a>
              </li>
              <li>
                <a
                  href="https://www.goodreads.com/book/show/40796177-range"
                  className="underline hover:text-[#DD6E42]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Range by David Epstein
                </a>
              </li>
              {/* Add more books here */}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#DD6E42] mb-2">Substack Articles</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <a
                  href="https://your-favorite-substack.com/article"
                  className="underline hover:text-[#DD6E42]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Great Article Title
                </a>
              </li>
              {/* Add more articles here */}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#DD6E42] mb-2">My Substack</h2>
            <a
              href="https://your-substack-url.substack.com"
              className="underline hover:text-[#DD6E42]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit my Substack
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  export default Reads;