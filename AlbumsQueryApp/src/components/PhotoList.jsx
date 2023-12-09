import React from "react";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import PhotoListItem from "./PhotoListItem";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { IoMdAddCircle } from "react-icons/io";

function PhotoList({ album }) {
  const { data, isError, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();

  const handlePhotoAdd = () => {
    addPhoto(album);
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
    content = data.map((photo) => {
      return <PhotoListItem key={photo.id} photo={photo} />;
    });
  }

  return (
    <>
      <div>
        <div className="topArrangement">
          <h3 style={{ color: "#9c27b0" }}>{album.title} Fotoları</h3>
          <Button variant="contained" color="success" onClick={handlePhotoAdd}>
            {results.isLoading ? (
              <CircularProgress />
            ) : (
              //false durumunda artık ekleme işlemi bitti tekrardan buton gözükecek
              <span>
                Fotoğraf Ekle <IoMdAddCircle />
              </span>
            )}
          </Button>
        </div>
      </div>
      <div className="fotoDiv">{content}</div>
    </>
  );
}

export default PhotoList;
