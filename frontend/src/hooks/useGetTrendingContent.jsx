import { useState, useEffect } from "react";
// import {contentType} from '../store/content'
import { useContentStore } from "../store/content";
import axios from "axios";

import i18n from "../i18n";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();

  const language = i18n.language;

  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(
        `/api/v1/${contentType}/trending?language=${language}`
      );
      setTrendingContent(res.data.content);
    };

    getTrendingContent();
  }, [contentType, language]);

  return { trendingContent };
};

export default useGetTrendingContent;
