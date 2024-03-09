import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import ListClients from "./ListClients";
import SearchClient from "./SearchClient";
import RegisterClients from "./RegisterClients";
import TracesRoutes from "./TracesRoutes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const traceRoutesStyle = {
  ...style,
  width: "90%",
  height: "90%",
  maxWidth: "none",
  overflow: "auto",
};

export default function FlexModal({ open, handleClose, type }) {
  const handleCloseModal = (event, reason) => {
    // Impede que o modal seja fechado ao clicar fora dele
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={type === "tracesRoutes" ? traceRoutesStyle : style}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          {type === "listClients" ? (
            <ListClients />
          ) : type === "searchClient" ? (
            <SearchClient />
          ) : type === "registerClients" ? (
            <RegisterClients />
          ) : type === "tracesRoutes" ? (
            <TracesRoutes />
          ) : (
            " "
          )}
        </Box>
      </Modal>
    </div>
  );
}
