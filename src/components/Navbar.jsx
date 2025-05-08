import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [vizOpen, setVizOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handles both mouse and keyboard users for dropdown
  const handleBlur = (e) => {
    // Close only if focus moves outside the dropdown and button
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.relatedTarget)
    ) {
      setVizOpen(false);
    }
  };

  return (
    <nav className="bg-[#4F6D7A] border-b-2 border-[#DD6E42] px-8 py-4 flex justify-between items-center shadow-md relative z-30">
      {/* Left: Social Icons and Site name/logo */}
      <div className="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/pete-vanbenthuysen/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C0D6DF] hover:text-[#DD6E42] transition"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={22} />
        </a>
        <a
          href="https://github.com/PeteVanBenthuysen"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C0D6DF] hover:text-[#DD6E42] transition"
          aria-label="GitHub"
        >
          <FaGithub size={22} />
        </a>
        <NavLink
          to="/"
          className="ml-4 text-[#C0D6DF] text-lg font-bold tracking-widest uppercase"
          style={{ letterSpacing: "0.2em" }}
        >
          Alphabet Soup
        </NavLink>
      </div>
      {/* Desktop Nav */}
      <div className="flex items-center flex-1 justify-end space-x-8 hidden sm:flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-[#C0D6DF] text-sm tracking-wide uppercase hover:text-[#DD6E42] transition${isActive ? " font-semibold" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `text-[#C0D6DF] text-sm tracking-wide uppercase hover:text-[#DD6E42] transition${isActive ? " font-semibold" : ""}`
          }
        >
          Projects
        </NavLink>
        {/* Visualizations Dropdown */}
        <div
          className="relative"
          ref={dropdownRef}
          onMouseEnter={() => setVizOpen(true)}
          onMouseLeave={() => setVizOpen(false)}
        >
          <button
            className={`text-[#C0D6DF] text-sm tracking-wide uppercase hover:text-[#DD6E42] transition flex items-center gap-1${vizOpen ? " font-semibold" : ""}`}
            type="button"
            aria-haspopup="true"
            aria-expanded={vizOpen}
            onFocus={() => setVizOpen(true)}
            onBlur={handleBlur}
          >
            Visualizations
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {vizOpen && (
            <div
              className="absolute right-0 mt-2 w-44 bg-[#4F6D7A] border border-[#DD6E42] rounded shadow-lg z-50"
              tabIndex={-1}
              onBlur={handleBlur}
            >
              <NavLink
                to="/visualizations/finance"
                className="block px-4 py-2 text-[#C0D6DF] hover:bg-[#DD6E42] hover:text-white transition"
                onClick={() => setVizOpen(false)}
              >
                Finance
              </NavLink>
              <NavLink
                to="/visualizations/nba"
                className="block px-4 py-2 text-[#C0D6DF] hover:bg-[#DD6E42] hover:text-white transition"
                onClick={() => setVizOpen(false)}
              >
                NBA
              </NavLink>
              <NavLink
                to="/visualizations/cs2"
                className="block px-4 py-2 text-[#C0D6DF] hover:bg-[#DD6E42] hover:text-white transition"
                onClick={() => setVizOpen(false)}
              >
                CS2
              </NavLink>
            </div>
          )}
        </div>
        <NavLink
          to="/reads"
          className={({ isActive }) =>
            `text-[#C0D6DF] text-sm tracking-wide uppercase hover:text-[#DD6E42] transition${isActive ? " font-semibold" : ""}`
          }
        >
          Reads
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `text-[#C0D6DF] text-sm tracking-wide uppercase hover:text-[#DD6E42] transition${isActive ? " font-semibold" : ""}`
          }
        >
          Contact
        </NavLink>
        {/* Resume Download Button */}
        <a
          href="/resume.pdf"
          download
          className="ml-8 px-4 py-1 border border-[#DD6E42] rounded-full text-[#DD6E42] text-sm tracking-wide uppercase bg-transparent hover:bg-[#DD6E42] hover:text-white transition"
        >
          Resume
        </a>
      </div>
      {/* Hamburger Icon */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-8 h-8"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className={`block h-0.5 w-6 bg-[#6A4E42] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}></span>
        <span className={`block h-0.5 w-6 bg-[#6A4E42] my-1 transition-all duration-300 ${open ? "opacity-0" : ""}`}></span>
        <span className={`block h-0.5 w-6 bg-[#6A4E42] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
      </button>
      {/* Mobile Nav */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#4F6D7A] flex flex-col items-center py-4 sm:hidden z-50 border-b-2 border-[#DD6E42]">
          <NavLink
            to="/"
            className="block py-2 text-[#C0D6DF] w-full text-center uppercase hover:text-[#DD6E42] transition"
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className="block py-2 text-[#C0D6DF] w-full text-center uppercase hover:text-[#DD6E42] transition"
            onClick={() => setOpen(false)}
          >
            Projects
          </NavLink>
          {/* Mobile Visualizations Dropdown */}
          <div className="w-full">
            <details>
              <summary className="block py-2 text-[#C0D6DF] w-full text-center uppercase hover:text-[#DD6E42] transition cursor-pointer">
                Visualizations
              </summary>
              <div className="flex flex-col w-full">
                <NavLink
                  to="/visualizations/finance"
                  className="block py-2 text-[#C0D6DF] w-full text-center hover:bg-[#DD6E42] hover:text-white transition"
                  onClick={() => setOpen(false)}
                >
                  Finance
                </NavLink>
                <NavLink
                  to="/visualizations/nba"
                  className="block py-2 text-[#C0D6DF] w-full text-center hover:bg-[#DD6E42] hover:text-white transition"
                  onClick={() => setOpen(false)}
                >
                  NBA
                </NavLink>
                <NavLink
                  to="/visualizations/cs2"
                  className="block py-2 text-[#C0D6DF] w-full text-center hover:bg-[#DD6E42] hover:text-white transition"
                  onClick={() => setOpen(false)}
                >
                  CS2
                </NavLink>
              </div>
            </details>
          </div>
          <NavLink
            to="/reads"
            className="block py-2 text-[#C0D6DF] w-full text-center uppercase hover:text-[#DD6E42] transition"
            onClick={() => setOpen(false)}
          >
            Reads
          </NavLink>
          <NavLink
            to="/contact"
            className="block py-2 text-[#C0D6DF] w-full text-center uppercase hover:text-[#DD6E42] transition"
            onClick={() => setOpen(false)}
          >
            Contact
          </NavLink>
          <a
            href="/resume.pdf"
            download
            className="block py-2 text-[#DD6E42] w-full text-center uppercase border border-[#DD6E42] rounded-full my-2 bg-transparent hover:bg-[#DD6E42] hover:text-white transition"
            onClick={() => setOpen(false)}
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;