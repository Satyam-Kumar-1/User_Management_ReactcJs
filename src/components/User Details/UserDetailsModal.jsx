// UserDetailsModal.js
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import "./UserDetailsModal.css";

const UserDetailsModal = ({ user, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="user-details-modal">
      <DialogTitle>
        <div className="modal-header">
          User Details
          <CloseIcon onClick={onClose} className="close-icon" />
        </div>
      </DialogTitle>
      <DialogContent className="custom-content-class"  style={{ width: "500px", height: "auto" }}>
        {/* Display user details in a table format */}
        <table className="user-details-table">
          <tbody>
            <tr>
              <td>User ID:</td>
              <td>{user.userId}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <td>Username:</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Creation Date:</td>
              <td>{new Date(user.creationDate).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" className="close-button">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsModal;