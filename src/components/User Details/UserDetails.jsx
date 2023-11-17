import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import "../Table/Table.css";
import UserDetailsModal from "./UserDetailsModal"; // Import the new component


const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

const url='https://user-management-server-d71b.onrender.com/';
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from the API
        const response = await fetch(`${url}api/users/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateReport = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="Table">
    
    <div className="fixed top-0 left-0 right-0 bg-gray-400 text-gray p-1 rounded-md shadow-md z-50">
  <h2 className="text-2xl font-semibold mb-2 text-center">User Details</h2>
</div>




      {/* Search input */}
      <div className="flex-center mb-1 ">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          className="custom-search-box"
        />
        <SearchIcon />
      </div>

      {/* User table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1049 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>UserID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {new Date(user.creationDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleGenerateReport(user)}
                  >
                    Generate Report
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>

   
  );
};

export default UserDetails;
