import { useEffect, useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalUser from "./components/ModalUser";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { UserProps } from "./lib/type";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import toastifyUtils from "./utils/toastify";
import { BiSolidErrorAlt } from "react-icons/bi";

function App() {
  const ERROR = ["expired_token", "NO_AUTH_FOUND", "invalid_token"];

  const [listUser, setListUser] = useState<UserProps[]>([]);

  const [modalShow, setModalShow] = useState(false);

  const [activeUser, setActiveUser] = useState<UserProps>();

  const [error, setError] = useState(false);

  // const refreshToken = async () => {
  //   try {
  //     const url = `https://bx-oauth2.aasc.com.vn/bx/oauth2_token/local.66b9a0496cf694.99441544`;
  // Bị chặn cors không thể tạo refreshToken tự động

  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log("Error fetching", error);
  //   }
  // };

  const fetchUser = async () => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}${
        import.meta.env.VITE_TOKEN
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log(data);

      if (ERROR.includes(data.error)) {
        // refreshToken(); Bị chặn cors không thể tạo refreshToken tự động
        toastifyUtils("error", "Token Auth Not Valid");
        setError(true);
        return;
      }
      setListUser(data.result);
    } catch (error) {
      toastifyUtils("error", "Server Error");
      setError(true);
      console.log("Error fetching users:", error);
    }
  };

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (activeUser) {
      setModalShow((prev) => !prev);
    } else {
      toastifyUtils("warning", "You have not selected an employee yet");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="main">
      <div className="header">
        <h2>List User In Bitrix24 :</h2>
        <div className="btnContainer">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              setError(false);
              setListUser([]);
              fetchUser();
            }}
          >
            Refresh
          </button>
          <button
            onClick={handleOpenModal}
            style={{ backgroundColor: "red", width: "12rem" }}
          >
            View employee
          </button>
        </div>
      </div>
      {activeUser && (
        <ModalUser
          show={modalShow}
          onHide={() => setModalShow((prev) => !prev)}
          user={activeUser}
        />
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Date Register</th>
            <th scope="col">Active</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 ? (
            listUser.map((user, index) => (
              <tr className="activeRow" key={index}>
                <th scope="row">{user.ID}</th>
                <td>
                  <p
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveUser(user.ID === activeUser?.ID ? undefined : user);
                    }}
                    className={`nameBtn ${
                      user.ID === activeUser?.ID && "activeName"
                    }`}
                  >
                    {user.NAME} {user.LAST_NAME}
                  </p>
                </td>
                <td>{user.EMAIL}</td>
                <td>
                  {" "}
                  {format(user.DATE_REGISTER, "dd 'Tháng' MM, yyyy", {
                    locale: vi,
                  })}
                </td>
                <td>
                  <div
                    className={`status ${user.ACTIVE ? "Active" : "Inactive"}`}
                  ></div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <div className="loaderContainer">
                  {error ? <BiSolidErrorAlt size={120} color="red"/> : <div className="loader"></div>}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default App;
