import React from "react";
import ExpandablePanel from "./ExpandablePanel";
import PhotoList from "./PhotoList";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRemoveAlbumMutation } from "../store";
import CircularProgress from "@mui/material/CircularProgress";

function AlbumListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleClick = () => {
    removeAlbum(album);
  };

  const header = (
    <>
      <button
        style={{ marginRight: "30px", border: "none", cursor: "pointer" }}
        onClick={handleClick}
      >
        {results.isLoading ? (
          <CircularProgress
            color="secondary"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        ) : (
          <RiDeleteBin6Line />
        )}
      </button>
      {album.title}
    </>
  );

  return (
    <div>
      <ExpandablePanel header={header}>
        <PhotoList album={album} />
      </ExpandablePanel>
    </div>
  );
}

export default AlbumListItem;
