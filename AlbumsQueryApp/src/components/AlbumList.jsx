import React from "react";
import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import { IoMdAddCircle } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import AlbumListItem from "./AlbumListItem";

function AlbumList({ user }) {
  const { data, isError, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAlbumAdd = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = (
      <CircularProgress
        sx={{ width: "50px", height: "50px" }}
        color="secondary"
      />
    );
  } else if (isError) {
    content = <div>Bir hatayla karşılaşıldı !</div>;
  }
  //hata yoksa ve fetch işlemi bittiyse yani data geliyorsa
  else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album} />;
    });
  }

  return (
    <>
      <div>
        <div className="topArrangement">
          <h3 style={{ color: "#9c27b0" }}>{user.name} Albümü</h3>
          <Button variant="contained" color="success" onClick={handleAlbumAdd}>
            {results.isLoading ? (
              <CircularProgress />
            ) : (
              //false durumunda artık ekleme işlemi bitti tekrardan buton gözükecek
              <span>
                Albüm Ekle <IoMdAddCircle />
              </span>
            )}
          </Button>
        </div>
      </div>
      <div>{content}</div>
    </>
  );
}

export default AlbumList;
