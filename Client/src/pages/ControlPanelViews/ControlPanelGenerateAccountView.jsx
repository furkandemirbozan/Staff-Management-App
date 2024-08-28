import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getRole, getToken } from "../../utils/Utils";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AdminGenerateAccountComponent from "../../components/ControlPanelGenerateAccountPageElements/AdminGenerateAccountComponent";
import { useSelector } from "react-redux";
import OwnerAndManagerCreateUserComponent from "../../components/ControlPanelGenerateAccountPageElements/OwnerAndManagerCreateUserComponent";

function ControlPanelGenerateAccountView() {
  const userRole = useSelector((state) => state.user.role);
  return (
    <>
      {userRole === "Admin" ? (
        <AdminGenerateAccountComponent />
      ) : (
        <OwnerAndManagerCreateUserComponent />
      )}
    </>
  );
}

export default ControlPanelGenerateAccountView;
