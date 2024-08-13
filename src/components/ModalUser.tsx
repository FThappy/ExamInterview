import { Modal } from "react-bootstrap";
import { UserProps } from "../lib/type";
import { FaUser } from "react-icons/fa6";
import "./ModalUser.scss";
import { MdEmail } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { SiStatuspal } from "react-icons/si";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

type Props = {
  show: boolean;
  onHide: () => void;
  user: UserProps;
};

const ModalUser = (props: Props) => {
  const { show, onHide, user } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Employee information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="gridContainer">
          <div className="">
            <div className="infoContainer">
              <div className="labelContainer">
                <FaUser size={24} />
                <p>Username :</p>
              </div>
              <p className="info">
                {user.NAME} {user.LAST_NAME}
              </p>
            </div>
            <div className="infoContainer">
              <div className="labelContainer">
                <MdEmail size={24} />
                <p>Email :</p>
              </div>
              <p className="info">{user.EMAIL}</p>
            </div>
            <div className="infoContainer">
              <div className="labelContainer">
                <FaCalendar size={24} />
                <p>Date Register : </p>
              </div>
              <p className="info">
                {format(user.DATE_REGISTER, "dd 'Tháng' MM, yyyy", {
                  locale: vi,
                })}
              </p>
            </div>
            <div className="infoContainer">
              <div className="labelContainer">
                <SiStatuspal size={24} />
                <p>Status :</p>
              </div>
              <p className="info">{user.ACTIVE ? "ACTIVE" : "INACTIVE"}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUser;
