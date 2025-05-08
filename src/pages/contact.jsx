import { FaLinkedin, FaGithub } from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#C0D6DF] text-[#4F6D7A] text-center">
      <h1 className="text-3xl font-semibold mb-4 tracking-wide">Get in Touch</h1>
      <p className="max-w-xl mb-6 text-lg">
        If you’d like to discuss my work, talk about graduate programs, or just connect, feel free to reach out.<br />
        Please also feel free to <a
          href="/assets/resume.pdf"
          download
          className="text-[#DD6E42] underline underline-offset-4 hover:text-[#6A4E42] transition"
        >download my resume</a>.
      </p>
      <a
        href="mailto:pete.vanbenthuysen.analytics@gmail.com"
        className="text-[#DD6E42] text-lg font-medium underline underline-offset-4 hover:text-[#6A4E42] transition"
      >
        pete.vanbenthuysen.analytics@gmail.com
      </a>
      <div className="flex gap-6 mt-8 justify-center">
        <a
          href="https://www.linkedin.com/in/pete-vanbenthuysen/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4F6D7A] hover:text-[#DD6E42] transition"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={32} />
        </a>
        <a
          href="https://github.com/PeteVanBenthuysen"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4F6D7A] hover:text-[#DD6E42] transition"
          aria-label="GitHub"
        >
          <FaGithub size={32} />
        </a>
      </div>
    </div>
  );
}

export default Contact;