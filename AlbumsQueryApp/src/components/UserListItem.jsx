import React from "react";
import ExpandablePanel from "./ExpandablePanel";
import AlbumList from "./AlbumList";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRemoveUserMutation } from "../store";
import CircularProgress from "@mui/material/CircularProgress";

function UserListItem({ user }) {
  const [removeUser, results] = useRemoveUserMutation();

  const handleClick = () => {
    removeUser(user);
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
      {user.name}
    </>
  );
  return (
    <div>
      <ExpandablePanel header={header}>
        <AlbumList user={user} />
      </ExpandablePanel>
    </div>
  );
}

export default UserListItem;
