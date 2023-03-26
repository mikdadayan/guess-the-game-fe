import React from "react";
type ArtistButtonProps = {
  name: string;
  onClick: () => void;
  disabled: boolean;
};

export const ArtistButton = ({
  name,
  onClick,
  disabled,
}: ArtistButtonProps) => {
  return (
    <button disabled={disabled} className="artist-button" onClick={onClick}>
      {name}
    </button>
  );
};
