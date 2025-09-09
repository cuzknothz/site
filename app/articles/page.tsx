"use client";
 
import { Article } from "@/components/article/Article";
import { Textz } from "@/components/Util/Tezt";
import { sleep } from "@/utils/app";
import { useEffect, useState } from "react";
 
const article = {
  twoK25: [
    {
      title: "A slightly belated 2024 retrospective",
      contentPreview:
        "Reflections on My First Offline Session Presentation Offline Session Presentation Offline Session PresentationOffline Session Presentation Offline Session Presentation",
    },
    {
      title: "Migrating a React Project",
      contentPreview: "Open Source Projects and Coderplace",
    },
    {
      title: "Migrating a React Project",
      contentPreview: "Open Source Projects and Coderplace",
    },
  ],
  twoK24: [],
};
 
export default function ArticlePage() {
  const [articles, setArticles] = useState<typeof article.twoK25>([]);
 
  const pushArticle = async () => {
    const lengthAricles = article.twoK25.length;
 
    for (let i = 0; i < lengthAricles; i++) {
      await sleep(200);
      setArticles((prevState) => [...prevState, article.twoK25[i]]);
     
    }
  };
 
  useEffect(() => {
    pushArticle();
  }, []);
 
  return (
    <div>
      <Textz text={"twoK25"} bold className="selection:!bg-[#710bf7]" />
      <div className="flex flex-col gap-[10px] mt-[10px]">
        {articles.map((i, idx) => (
          <Article key={idx} {...i} />
        ))}
      </div>
    </div>
  );
}