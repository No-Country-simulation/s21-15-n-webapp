import { useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  level: number;
  avatar: string;
}

export function useUserModal() {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openUserModal = (user: UserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeUserModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return {
    selectedUser,
    isModalOpen,
    openUserModal,
    closeUserModal,
  };
}
