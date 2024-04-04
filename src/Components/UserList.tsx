import React from "react";
import "../App.css";

interface UserListProps {
  users: string[];
  current: number;
  handleActiveDiv: (index: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, current, handleActiveDiv }) => {
  return (
    <div>
      {users.map((item: string, i: number) => {
        return (
          <div
            onClick={() => handleActiveDiv(i)}
            className={`userList ${i === current ? "activeDiv" : ""}`}
            key={i}
          >
            <p style={{ fontSize: "24px" }}>{item}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eius commodi exercitationem, tempora expedita in eligendi maxime sapiente excepturi odio itaque.
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
