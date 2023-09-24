import { logo } from "src/assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-4">
        {/* Image here */}
        <img src={logo} alt="logo" />

        {/* button here */}
        <button type="button" className="black_btn" onClick={() => window.open("https://www.github.com/saifrehman99")}>
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Article with <br className="max-md:hidden" /> <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">Simplify your article with summize, open-source AI Generated platform, transforming articles into conclusion</h2>
    </header>
  );
};

export default Hero;
