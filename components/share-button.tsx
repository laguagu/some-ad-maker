import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const ShareButton = ({
  url,
  title,
  description,
  hashtags,
}: {
  url: string;
  title?: string;
  description?: string;
  hashtags?: string[];
}) => {
  if (!url) {
    console.error("URL vaaditaan jakamista varten");
    return null;
  }

  return (
    <div className="flex space-x-2">
      <FacebookShareButton url={url} hashtag={hashtags?.[0]}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} hashtags={hashtags}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton
        url={url}
        title={title}
        summary={description}
        source="Huonekaluliike"
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButton;
