"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import axios from "axios";

// Mock data for demonstration
// const mockUsers = Array(50)
//   .fill()
//   .map((_, i) => ({
//     id: i + 1,
//     username: `user${i + 1}`,
//     email: `user${i + 1}@example.com`,
//     role: i % 5 === 0 ? "ADMIN" : i % 3 === 0 ? "ORGANIZER" : "USER",
//     problemsCreated: i % 3 === 0 ? Math.floor(Math.random() * 20) : 0,
//     problemsSolved: Math.floor(Math.random() * 100),
//   }));

const ROLES = ["USER", "ORGANIZER", "ADMIN"];

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    axios
      .get(import.meta.env.VITE_API_URL + "/users", {
        headers: { authorization_token: "Bearer " + authToken },
      })
      .then((res) => {
        console.log(res);
        setUsers(
          res.data?.map((user) => {
            return {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.Role,
              problemsCreated: 42,
              problemsSolved: 69,
            };
          })
        );
      })
      .catch((error) => {
        console.error(error);
        setUsers([]);
      });
  }, [refresh]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 10;

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const changeRole = (userId, newRole) => {
    const authToken = localStorage.getItem("auth_token");
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        { Role: newRole },
        {
          headers: { authorization_token: "Bearer " + authToken },
        }
      )
      .then((res) => {
        console.log('newUser', res);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            variant={currentPage === i ? "default" : "outline"}
            className="mx-1"
          >
            {i}
          </Button>
        );
      }
    } else {
      const leftEllipsis = currentPage > 3;
      const rightEllipsis = currentPage < totalPages - 2;

      if (leftEllipsis) {
        pageNumbers.push(
          <Button
            key={1}
            onClick={() => setCurrentPage(1)}
            variant="outline"
            className="mx-1"
          >
            1
          </Button>
        );
        pageNumbers.push(
          <Button key="left-ellipsis" variant="ghost" className="mx-1" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        );
      }

      const start = leftEllipsis ? Math.max(currentPage - 1, 2) : 1;
      const end = rightEllipsis
        ? Math.min(currentPage + 1, totalPages - 1)
        : totalPages;

      for (let i = start; i <= end; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            variant={currentPage === i ? "default" : "outline"}
            className="mx-1"
          >
            {i}
          </Button>
        );
      }

      if (rightEllipsis) {
        pageNumbers.push(
          <Button
            key="right-ellipsis"
            variant="ghost"
            className="mx-1"
            disabled
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        );
        pageNumbers.push(
          <Button
            key={totalPages}
            onClick={() => setCurrentPage(totalPages)}
            variant="outline"
            className="mx-1"
          >
            {totalPages}
          </Button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6">
        <Label htmlFor="search">Search Users</Label>
        <Input
          id="search"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Problems Created</TableHead>
              <TableHead>Problems Solved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onValueChange={(newRole) => changeRole(user.id, newRole)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{user.problemsCreated}</TableCell>
                <TableCell>{user.problemsSolved}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center mt-4 space-x-2">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        {renderPaginationButtons()}
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
