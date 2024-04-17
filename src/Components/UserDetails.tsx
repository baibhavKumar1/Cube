/**
 * UserDetails.tsx
 *
 * This component is responsible for fetching and displaying user details including images
 * from a random page of picsum.photos. It showcases the use of React hooks for state management
 * and side effects, and axios for making HTTP requests.
 */
import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

interface UserDetailsProps {
  current: number;
}
interface UserDetailsResponse {
  download_url: string
}
/**
 * Displays details for a user including a set of images fetched from an external API (picsum.photos).
 * 
 * @param current The index of the current user being displayed.
 * @returns JSX elements to render the UI.
 */
const UserDetails: React.FC<UserDetailsProps> = ({ current }) => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Fetches data from the picsum.photos API based on a randomly generated page number.
   * Updates the component's state with the fetched data or handles errors by stopping the loading indicator.
   * 
   * Takes no parameters and does not return a value.
   */
  const FetchData = () => {
    setLoading(true);
    const randomPage = Math.floor(Math.random() * 100) + 1;
    axios.get(`https://picsum.photos/v2/list?page=${randomPage}&limit=9`)
      .then((res) => {
        setData(res?.data?.map((item: UserDetailsResponse) => item.download_url));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    FetchData();
    const intervalId = setInterval(() => {
      FetchData()
    }, 20000);

    return () => clearInterval(intervalId);
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
