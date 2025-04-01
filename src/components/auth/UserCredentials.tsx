
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This component will display all available user credentials for demo purposes
const UserCredentials = () => {
  const users = [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      role: "Admin"
    },
    {
      name: "Dr. Sarah Johnson",
      email: "doctor@example.com",
      password: "password123",
      role: "Doctor"
    },
    {
      name: "John Patient",
      email: "patient@example.com",
      password: "password123",
      role: "Patient"
    },
    {
      name: "Dr. Michael Chen",
      email: "drchen@example.com",
      password: "password123",
      role: "Doctor"
    },
    {
      name: "Emily Rodriguez",
      email: "emily@example.com",
      password: "password123",
      role: "Patient"
    },
    {
      name: "Dr. Lisa Williams",
      email: "drwilliams@example.com",
      password: "password123",
      role: "Doctor"
    },
    {
      name: "Robert Thompson",
      email: "robert@example.com",
      password: "password123",
      role: "Patient"
    }
  ];

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>Demo User Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserCredentials;
