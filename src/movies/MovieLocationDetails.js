import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";

const MovieLocationDetails = ({ row }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const timingsFormatter = (cell, row) => {
    return (
      <ul>
        {cell.map((item, key) => (
          <li key={key}>{item}</li>
        ))}
      </ul>
    );
  };

  const { locations: locationsData } = row;

  const columns = [
    {
      dataField: "theatre_name",
      text: "Theatre Name",
    },
    {
      dataField: "location",
      text: "Location",
    },
    {
      dataField: "timings",
      text: "Timings",
      formatter: timingsFormatter,
    },
    {
      dataField: "price",
      text: "Price (INR)",
    },
  ];

  return (
    <div>
      <Button variant="success" onClick={toggleModal}>
        Show Details
      </Button>
      <Modal show={showModal} onHide={toggleModal} size="lg">
        <ModalHeader>
          <div className="display-5">Movie Available Location Details</div>
        </ModalHeader>
        <ModalBody>
          <BootstrapTable
            keyField="_id"
            data={locationsData}
            columns={columns}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleModal} variant="danger">
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MovieLocationDetails;
