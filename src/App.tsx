import { useCallback, useRef, useState } from "react";
import "./App.css";
import UserList from "./Components/UserList";
import UserDetails from "./Components/UserDetails";

function App() {
  const arr = new Array(10).fill('').map((_, index) => `User ${index + 1}`)
  const [users, setUsers] = useState<string[]>(arr);
  const [current, setCurrent] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const usersList = useRef<HTMLDivElement>(null);

  const handleActiveDiv = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const handleScroll = useCallback(() => {
    if (usersList.current) {
      const { scrollTop, clientHeight, scrollHeight } = usersList.current;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setIsLoading(true);
        setTimeout(() => {
          setUsers((prevUsers) =>
            prevUsers.concat(
              new Array(10).fill('').map((_, index) => `User ${prevUsers.length + index + 1}`)
            )
          );
          setIsLoading(false);
        }, 1000);
      }
    }
  }, []);

  return (
    <div className="App" style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ overflowY: "auto", width: "30vw", maxHeight: "100vh" }} ref={usersList} onScroll={handleScroll} >
        <UserList users={users} current={current} handleActiveDiv={handleActiveDiv} />
        {isLoading && <p style={{ fontSize: "24px" }}>Getting Users...</p>}
      </div>
      <div className="right"><UserDetails current={current} /></div>
    </div>
  );
}

export default App;
