import "./styles.css";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function App() {
  const [state, setState] = useState({ users: [] });
  useEffect(() => {
    //https://randomuser.me/api/?results=10
    fetch("https://randomuser.me/api/?results=50")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setState({ users: data.results });
      });
  }, []);

  const fetchMoreData = () => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setState({ users: state.users.concat(data.results) });
      });
  };
  let usersList = (
    <tr>
      <td>123</td>
    </tr>
  );
  if (state.users.length)
    usersList = state.users.map((user, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{user.name.first}</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
    ));

  return (
    <div className="App">
      <h1>Таблица пользователей</h1>
      <InfiniteScroll
        dataLength={state.users.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <table className="table">
          <thead>
            <tr>
              <td>#</td>
              <td>First</td>
              <td>Last</td>
              <td>Handle</td>
            </tr>
          </thead>
          <tbody>{usersList}</tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}
