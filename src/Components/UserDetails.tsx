import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

interface UserDetailsProps {
  current: number;
}
interface UserDetailsResponse {
  download_url: string
}
const UserDetails: React.FC<UserDetailsProps> = ({ current }) => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const FetchData = () => {
    setLoading(true);
    const randomPage = Math.floor(Math.random() * 100) + 1;
    axios.get(`https://picsum.photos/v2/list?page=${randomPage}&limit=9`)
      .then((res) => {
        setData(res?.data?.map((item: UserDetailsResponse) => item.download_url));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }
  useEffect(() => {
    FetchData()
  }, []);



  return (
    <div>
      <div className="user-details">
        <p style={{ fontSize: "24px" }}>User {current + 1} details</p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
          aliquam ex porro odit provident, eum aspernatur unde itaque voluptatem
          consequuntur ut consectetur distinctio illum incidunt aut quas facilis
          doloribus at. Maiores est, possimus quaerat numquam incidunt in cumque
          corporis aperiam. Ipsa architecto qui velit quibusdam.
        </p>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="container">
          {data?.slice(0, 9).map((item, index) => (
            <div key={index}>
              <img src={item} alt="" style={{ width: "250px", height: "150px" }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
