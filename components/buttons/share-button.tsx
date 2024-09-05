import { PartialImageAnalysis, StreamedAnalysis } from "@/lib/types";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

type ShareButtonProps = {
  analysis: Record<string, any>;
};

const ShareButton: React.FC<ShareButtonProps> = ({ analysis }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/analysis/latest`;

  // Delete duplicate hashtags
  const cleanHashtags = (hashtags: string[] | undefined) =>
    hashtags?.map((tag) => (tag.startsWith("#") ? tag.slice(1) : tag)) || [];

  return (
    <div className="flex space-x-2">
      <FacebookShareButton
        url={shareUrl}
        hashtag={cleanHashtags(analysis.hashtags)?.[0]}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={analysis.furniture}
        hashtags={cleanHashtags(analysis.hashtags)}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton
        url={shareUrl}
        title={analysis.furniture}
        summary={analysis.description}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButton;
