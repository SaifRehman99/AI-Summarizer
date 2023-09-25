import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "src/assets";
import { useLazyGetSummaryQuery } from "src/services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articleFromStorage = JSON.parse(localStorage.getItem("articles"));

    if (articleFromStorage) {
      setAllArticles(articleFromStorage);
    }
  }, []);

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);

    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form className="relative flex items-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt={"icon"} className="absolute left-0 my-2 ml-3 w-5" />
          <input
            type="url"
            value={article.url}
            placeholder="Enter a URL"
            className="url_input peer"
            required
            onChange={(e) => {
              setArticle({
                ...article,
                url: e.target.value,
              });
            }}
          />
          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            <p>↵</p>
          </button>
        </form>

        {/* URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles?.map((item, index) => (
            <div key={index} className="link_card">
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img src={copied === item.url ? tick : copy} alt="copy icon" className="w-[40%] h-[40%] object-contain" />
              </div>
              <p onClick={() => setArticle(item)} className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item?.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img className="w-20 h-20 object-contain" src={loader} alt="loader" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasnt supposed to happen
            <br />
            <span className="font-satoshi font-normal text-gray-700">{error?.data?.error}</span>
          </p>
        ) : (
          article?.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">{article?.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
