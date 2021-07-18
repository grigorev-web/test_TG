import InfiniteScroll from "react-infinite-scroll-component";
import { FaHeart, FaSync } from "react-icons/fa";

// Таблица пользователей
export default function UsersTable(props) {
  let usersList = (
    <tr>
      <td>Загрузка...</td>
    </tr>
  );
  if (props.users.length)
    usersList = props.users.map((user, index) => (
      <tr key={index}>
        <td className="user-col">
          <img src={user.picture.thumbnail} alt={user.name.first} />
          <p>{user.name.first + " " + user.email}</p>
        </td>
        <td>{new Date(user.registered.date).toLocaleDateString()}</td>
        <td>
          {user.location.city +
            " " +
            user.location.street.name +
            " " +
            user.location.street.number}
        </td>
        <td>
          <div className="btn btn-info" onClick={() => props.info(user)}>
            details
          </div>
        </td>
      </tr>
    ));

  return (
    <>
      <h1>Таблица пользователей</h1>
      <div className="table-icons">
        <span className="fa-heart" onClick={props.openModal}>
          <FaHeart />
        </span>
        <span
          className={props.loading ? "loading" : ""}
          onClick={() => props.refresh()}
        >
          <FaSync style={{ cursor: "pointer" }} />
        </span>
      </div>
      <InfiniteScroll
        dataLength={props.users.length}
        next={props.more}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>User</th>
              <th>Registration Date</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{usersList}</tbody>
        </table>
      </InfiniteScroll>
    </>
  );
}
