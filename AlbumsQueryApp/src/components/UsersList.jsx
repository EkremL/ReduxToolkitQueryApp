import React from "react";
//veriyi çekmek için storea ulasmamız gerek
import { useFetchUsersQuery } from "../store";
import Skeleton from "@mui/material/Skeleton";
import UserListItem from "./UserListItem";
import Button from "@mui/material/Button";
import { IoMdAddCircle } from "react-icons/io";

function UsersList() {
  const { data, isError, isFetching } = useFetchUsersQuery();
  console.log(data);
  //!isfetching ilk defa yüklendiğinde yani render oldugunda true olur diğer yüklenmelerde false gelmeye devam eder
  //*isloading yeniden çekme işlemi olduğu sürece true gelmeye devam eder

  let content;
  //ilk defa yükleniyosa
  if (isFetching) {
    content = (
      <Skeleton
        variant="rounded"
        animation="wave"
        width={"100%"}
        height={800}
        sx={{ bgcolor: "bisque" }}
      />
    );
  } else if (isError) {
    content = <div>Bir hatayla karşılaşıldı !</div>;
  }
  //hata yoksa ve fetch işlemi bittiyse yani data geliyorsa
  else {
    content = data.map((user) => {
      return <UserListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="topArrangement">
        <h1 style={{ color: "#9c27b0" }}>Kişiler</h1>
        <Button variant="contained" color="secondary">
          Kişi Ekle <IoMdAddCircle />
        </Button>
      </div>

      {content}
    </div>
  );
}

export default UsersList;
