import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import CircularProgress from "@mui/material/CircularProgress";
import { useRemovePhotoMutation } from "../store";

function PhotoListItem({ photo }) {
  const [removePhoto, results] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo);
  };

  return (
    <div
      className="photo"
      style={{ cursor: "pointer", position: "relative" }}
      onClick={handleRemovePhoto}
    >
      <img src={photo.url} alt="" />
      <div className="deleteCircularDiv">
        {results.isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <RiDeleteBin6Line />
        )}
      </div>
    </div>
  );
}

export default PhotoListItem;
