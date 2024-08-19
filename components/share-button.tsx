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
  productId,
  title,
  description,
  hashtags,
}: {
  productId: string;
  title?: string;
  description?: string;
  hashtags?: string[];
}) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/analysis/${productId}`;
  // FIXME: Poista HasTag "#" merkit hastags muuttujasta. React-Share generoi ne automaattisesti. Näin ollen ne eivät tule 2x näkyviin postaukseen.
  return (
    <div className="flex space-x-2">
      <FacebookShareButton url={shareUrl} hashtag={hashtags?.[0]}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title} hashtags={hashtags}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl} title={title} summary={description}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButton;
