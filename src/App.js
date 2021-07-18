import "./styles.css";
import { useEffect, useState } from "react";

import UsersTable from "./components/UsersTable";
import UserProfile from "./components/UserProfile";
import Modal from "@material-ui/core/Modal";

export default function App() {
  // initial state
  const [state, setState] = useState({
    users: [], // массив пользователей
    info: false, // страница пользователя
    loading: true, // статус загрузки
    modal: false // включает модальное окно
  });
  // Получаем users при загрузке
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setState((prev) => ({
          ...prev,
          loading: false,
          users: data.results
        }));
      });
  }, []);

  // обновить всех пользователей
  const refreshData = () => {
    setState((prev) => ({
      ...prev,
      loading: true
    }));
    fetch("https://randomuser.me/api/?results=50")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setState((prev) => ({
          ...prev,
          loading: false,
          users: data.results
        }));
      });
  };
  // получаем по 10 пользователей при прокрутке
  const fetchMoreData = () => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setState((prev) => ({
          ...prev,

          users: state.users.concat(data.results)
        }));
      });
  };

  // переключение режим страницы пользователя
  const setInfo = (user) => {
    setState((prev) => ({
      ...prev,
      info: user
    }));
  };

  // открывает модальное окно
  const handleModalOpen = () => {
    setState((prev) => ({
      ...prev,
      modal: true
    }));
  };

  // закрывает
  const handleModalClose = () => {
    setState((prev) => ({
      ...prev,
      modal: false
    }));
  };
  // случайный пользователь из загруженных
  let randomUser = state.users[getRandomInt(0, state.users.length)];

  // html модального окна
  const modalBody = randomUser ? (
    <div className="card user-profile">
      <img
        className="card-img-top"
        src={randomUser.picture.large}
        alt={randomUser.login.username}
      />
      <div className="card-body text-center">
        <h5>Random user</h5>
        <h5 className="card-title">{randomUser.name.first}</h5>
        <p className="card-text">{randomUser.email}</p>
        <div className="btn btn-info" onClick={() => handleModalClose()}>
          close
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
  // вспомогательная функция
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

  return (
    <div className="App container">
      {state.info ? (
        <UserProfile user={state.info} back={setInfo} />
      ) : (
        <UsersTable
          users={state.users}
          more={fetchMoreData}
          info={setInfo}
          loading={state.loading}
          refresh={refreshData}
          openModal={handleModalOpen}
        />
      )}
      <Modal
        open={state.modal}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    </div>
  );
}
