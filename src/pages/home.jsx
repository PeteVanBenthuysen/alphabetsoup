import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  // Use sessionStorage to persist unlock state for the session
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("unlocked") === "true");
  const [password, setPassword] = useState("");
  const [reloadKey, setReloadKey] = useState(Date.now());
  const [showLetters, setShowLetters] = useState(false);

  const location = useLocation();

  // Add svgKey state to force remount of SVG on route change
  const [svgKey, setSvgKey] = useState(Date.now());
  useEffect(() => {
    setSvgKey(Date.now());
  }, [location.key]);

  const correctPassword = import.meta.env.VITE_SITE_PASSWORD;

  useEffect(() => {
    setShowLetters(false);
    setReloadKey(Date.now());
    const t = setTimeout(() => setShowLetters(true), 350);
    return () => clearTimeout(t);
  }, []);

  const handleUnlock = () => {
    if (password === correctPassword) {
      setUnlocked(true);
      sessionStorage.setItem("unlocked", "true"); // Persist unlock for session
    } else {
      alert("Incorrect password.");
    }
  };

  const letterConfigs = [
    { src: "/letters/letterW.png", alt: "W", top: "25%", left: "-100%", delay: "0.5s" },
    { src: "/letters/letterE.png", alt: "E", top: "27%", left: "-60%", delay: "1s" },
    { src: "/letters/letterL.png", alt: "L", top: "25%", left: "-20%", delay: "1.5s" },
    { src: "/letters/letterC.png", alt: "C", top: "27%", left: "20%", delay: "2s" },
    { src: "/letters/letterO.png", alt: "O", top: "25%", left: "60%", delay: "2.5s" },
    { src: "/letters/letterM.png", alt: "M", top: "27%", left: "100%", delay: "3s" },
    { src: "/letters/letterE.png", alt: "E", top: "25%", left: "140%", delay: "3.5s" },
  ];

  const rotations = useMemo(
    () => letterConfigs.map(() => `${Math.floor(Math.random() * 25) - 12}deg`),
    []
  );

  if (!unlocked) {
    return (
      <div
        key={reloadKey}
        className="fixed inset-0 z-50 flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: 'url("/soupbowl.png")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '55% center',
        }}
      >
        <div className="relative w-60 h-60 sm:w-80 sm:h-80 max-w-full mx-auto">
          {showLetters &&
            letterConfigs.map((cfg, i) => (
              <img
                key={i}
                src={cfg.src}
                alt={cfg.alt}
                className="absolute w-12 h-12 fade-in-drift"
                style={{
                  top: cfg.top,
                  left: cfg.left,
                  "--rotation": rotations[i],
                  animationDelay: cfg.delay,
                  zIndex: 1,
                }}
              />
            ))}
        </div>
        <div className="absolute left-1/2 lg:left-[47.3%] top-[70%] lg:top-[55%] -translate-x-1/2 flex flex-col items-center w-[90vw] max-w-xs">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleUnlock();
            }}
            className="w-full flex flex-col items-center"
          >
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 text-black rounded"
            />
            <button
              type="submit"
              className="mt-2 w-full px-4 py-2 bg-white text-black rounded"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main unlocked homepage with animated SVG path
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#C0D6DF] text-[#4F6D7A] pt-24">
      {/* SVG positioned at the top center */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2 z-10">
        <svg
          key={svgKey}
          viewBox="0 0 400 112"
          className="w-48 sm:w-64 md:w-96 lg:w-[32rem] h-auto text-[#4F6D7A]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M280.582 17.388c-13.112 4.816-14.965 16.914-4.539 29.631 7.402 9.028 8.865 15.432 5.095 22.305-5.764 10.51-17.219 4.12-12.332-6.879.507-1.142.332-1.222-1.753-.8-10.112
             2.05-6.063 18.082 4.567 18.082 16.222 0 21.954-23.041 9.225-37.087-8.194-9.043-7.456-16.654 2.092-21.575 7.467-3.849 11.036 1.436 7.41 10.976-.781 2.054-1.42 3.811-1.42 
             3.904-.001.483 4.351.078 5.441-.505 2.831-1.515 4.042-11.199 1.824-14.584-2.792-4.262-9.433-5.737-15.61-3.468M48.136 19.159c-5.848 3.873-10.597 11.895-15.749 26.601l-2.543 
             7.26-4.19 1.504c-6.615 2.375-7.18 4.416-.952 3.44 1.78-.279 3.237-.263 3.237.035 0 1.345-6.323 16.819-7.578 18.545-1.845 2.539-1.517 2.709 3.208 1.661 4.99-1.107 6.245-2.778
             8.389-11.168 2.817-11.022 2.36-10.267 6.544-10.79 2.032-.253 5.123-.247 6.871.015l3.177.477-.396 3.147c-.218 1.73-.701 5.464-1.073 8.297-.609 4.631-.091 13.106.858 
             14.055.178.177 1.983-.201 4.013-.841l3.689-1.163-1.299-2.468c-1.123-2.134-1.259-3.548-1.002-10.457l.297-7.988 2.824-2.824c3.362-3.363 3.491-4.027.779-4.027-2.481 0-2.485 
             1.117.043-13.865 2.629-15.575 2.812-19.286 1.019-20.6-2.31-1.693-6.605-1.205-10.166 1.154m134.3.773c-2.492 1.879-7.981 17.609-9.756 27.957-.789 4.605-1.556 6.916-2.868 
             8.646-8.043 10.604-11.548 10.011-9.095-1.538 1.865-8.785 1.875-10.023.077-10.023-1.159 0-1.271-.216-.684-1.313.851-1.591.3-3.262-1.372-4.157-4.744-2.539-12.887 3.946-17.182 
             13.684-2.111 4.785-7.75 9.504-11.358 9.504-1.863 0-1.784-.93.637-7.496 5.236-14.202-1.524-20.596-10.585-10.011-2.984 3.486-2.98 3.443.733-8.398 1.702-5.429 3.278-11.327 
             3.502-13.107l.407-3.237h-2.424c-3.904 0-4.58.522-4.58 3.534 0 3.357-5.158 25.949-6.531 28.603-1.481 2.865-8.283 9.425-10.909 10.523-4.151 1.734-4.457 1.267-1.924-2.939 
             6.266-10.406 4.564-22.071-2.812-19.267-1.002.381-2.939 1.616-4.304 2.745l-2.481 2.052-.341-2.226c-.364-2.378-1.593-3.014-4.44-2.3-1.373.345-1.558.726-1.273 2.616.218 
             1.441-1.704 10.392-5.507 25.654-5.501 22.074-5.775 23.515-4.701 24.702 1.628 1.799 4.227 1.646 4.642-.273.182-.843 1.131-5.673 2.11-10.732 3.496-18.073 3.743-18.929 
             4.841-16.833 1.197 2.285 3.7 2.953 6.556 1.749 1.211-.511 3.472-.827 5.024-.704 3.61.288 6.392-1.114 11.073-5.58 2.136-2.037 3.478-2.947 3.205-2.173-1.376 3.903-1.278 
             7.036.246 7.852 2.532 1.355 3.132.422 4.747-7.372 1.686-8.137 3.861-11.818 8.36-14.145 4.355-2.252 5.051.681 2.246 9.463-4.244 13.291 2.205 16.754 11.863 6.371 1.906-2.049 
             2.797-1.782 2.797.84 0 6.013 7.332 6.37 13.364.651l2.121-2.011.439 2.193c1.175 5.875 5.291 5.722 11.073-.411l4.183-4.437.777 3.087c2.641 10.486 17.188 4.332 
             19.552-8.272.512-2.724.584-2.78 5.214-3.981 4.326-1.122 4.176-1.243 2.909 2.346-5.695 16.141 8.262 21.757 22.24 8.949l4.329-3.967v3.708c0 6.794 5.576 9.704 10.971 5.725 
             6.188-4.562 14.81-16.439 11.935-16.439-.332 0-1.097.755-1.701 1.677-11.782 17.98-21.825 16.025-14.463-2.815 2.075-5.312 4.135-11.094 4.577-12.85l.804-3.193 
             6.869.243c10.864.385 9.214-2.837-2.048-3.999l-3.616-.373.416-3.98c.751-7.18-4.101-6.758-6.676.581l-1.617 4.607-5.419.202c-10.141.377-9.015 4.212 1.24 4.224 3.105.003 
             3.29.101 2.906 1.537-.226.843-1.08 4.875-1.899 8.959-2.631 13.125-17.572 24.613-23.013 17.695-2.227-2.83-1.758-3.798 3.751-7.737 5.481-3.92 7.509-6.216 8.479-9.596 
             1.873-6.532-4.94-8.146-11.267-2.669-5.777 5-13.34 6.203-14.938 2.377-1.207-2.89-3.105-3.134-5.527-.713-2.116 2.117-2.111 3.335.023 5.013 3.716 2.924-3.74 16.574-8.133 
             14.888-3.547-1.361-3.185-7.892.93-16.747 3.574-7.692 7.076-18.552 7.874-24.417l.487-3.578h-1.978c-1.087 0-2.486.383-3.107.852M55.085 22.809c.126 1.108-1.071 8.04-2.66 
             15.405l-2.89 13.392-6.701-.079c-6.363-.075-6.68-.148-6.3-1.442 4.234-14.395 8.972-24.294 13.135-27.443 3.537-2.676 5.097-2.628 5.416.167m18.099-1.862c-.413.285-.966 
             2.167-1.228 4.183s-2.481 12.119-4.931 22.452c-4.742 20.002-4.773 20.561-1.122 20.561 1.397 0 11.826-37.312 12.57-44.974.238-2.442-3-3.802-5.289-2.222M302.63 41.95c-5.94 
             4.998-8.471 19.224-4.225 23.743 4.574 4.868 12.708 1.741 16.276-6.256 1.066-2.389 7.474-7.648 9.319-7.648.085 0-.138 1.696-.495 3.77-1.752 10.167 6.329 16.03 13.462 
             9.768 1.337-1.175 2.514-2.018 2.615-1.874.101.143.711 1.104 1.355 2.135 2.243 3.584 7.263 1.654 12.936-4.973 3.213-3.754 3.26-4.179-1.682 15.412-4.519 17.92-4.557 
             19.373-.507 19.373 1.737 0 1.669.221 4.761-15.411 3.256-16.463 2.741-15.12 4.951-12.909 1.948 1.948 2.89 2.106 5.681.95 1.055-.436 3.451-.723 5.325-.636 4.107.19 
             8.272-2.245 12.498-7.308 7.086-8.489 7.382-11.965.37-4.344-4.863 5.284-9.044 8.313-11.478 8.313-1.187 0-1.406-1.063-.353-1.713 1.403-.867 4.844-8.716 5.222-11.911 
             1.148-9.693-3.137-12.628-10.373-7.105l-2.96 2.259-.211-2.174c-.229-2.361-1.434-2.964-4.425-2.214-1.347.338-1.638.747-1.341 1.883.771 2.951-.976 8.043-4.12 12.004-6.29 
             7.924-10.625 10.342-11.499 6.415a90.824 90.824 0 0 0-.723-3.009c-.167-.624.006-1.327.386-1.562 2.603-1.609 4.607-15.578 2.283-15.914-3.265-.471-6.103 5.509-6.819 
             14.37-.435 5.38-2.583 7.989-6.577 7.989-5.221 0-5.022-6.837.597-20.613.392-.96.131-1.193-1.335-1.193-2.732 0-4.083.993-5.437 3.995-.954 2.115-2.109 3.187-5.233 
             4.851l-4.009 2.137v-2.21c0-7.952-8.677-13.067-14.235-8.39m-147.085 2.882c-.12 1.107.199 1.505 1.205 1.505 1.49 0 1.502-.23-.405 7.496-1.491 6.039-7.42 10.75-9.847 
             7.824-1.994-2.402.822-11.449 5.171-16.618 2.057-2.445 4.129-2.556 3.876-.207m57.929-1.05c.789 2.244-1.608 5.668-6.174 8.818l-2.922 2.015.463-1.924c1.56-6.483 
             7.375-12.484 8.633-8.909m97.916 1.148c.388.725.705 3.024.705 5.11v3.793h-2.385c-3.258 0-5.11-1.962-5.11-5.413 0-4.14 5.052-6.737 6.79-3.49M97.545 46.626c1.075 
             2.359.267 5.596-2.613 10.464-2.661 4.497-3.378 4.875-5.996 3.16-1.007-.66-2.215-.898-3.111-.613-3.347 1.062.068-7.099 4.836-11.559 3.73-3.489 5.761-3.917 
             6.884-1.452m275.868-.991c2.32 1.466.353 9.007-3.641 13.962l-1.626 2.017-2.753-1.242c-1.514-.682-3.087-1.035-3.494-.783-2.066 1.277.193-5.753 3.055-9.505 
             3.095-4.058 6.361-5.776 8.459-4.449M305.262 56.75c.927.644 2.545 1.172 3.595 1.172 1.895 0 1.902.016.875 2.003-3.323 6.425-9.221 5.426-9.221-1.562 0-4.547.604-5.793 
             1.987-4.103.594.725 1.838 1.846 2.764 2.49"
            className="animate-write"
            style={{ "--svg-path-length": 2333.43 }}
            stroke="#4F6D7A"
          />
        </svg>
      </div>
      {/* Main content centered below SVG */}
      <div className="flex flex-col items-center justify-center w-full mt-16">
        <p className="text-lg mt-2 text-center max-w-2xl text-[#4F6D7A]">
          I'm Pete VanBenthuysen—a data scientist with a passion for applying mathematical modeling, system design, and statistical thinking to build robust, data-driven results.<br /><br />
          My last name spans half the alphabet, which inspired the name <span className="text-[#DD6E42] font-semibold"><em>Alphabet Soup</em></span>. But it’s more than just a play on letters—like a good bowl of soup, my work brings together many ingredients: different languages, frameworks, and ideas, all simmered into cohesive, scalable solutions.<br /><br />
          This portfolio reflects that philosophy—mixing precision and creativity to craft models with depth and flavor.
        </p>
      </div>
    </div>
  );
}

export default Home;