import React, { useEffect, useState } from "react";
import ProfileWidget from "../../components/ControlPanelHomePageElements/ProfileWidget";
import UpcomingBirthdays from "../../components/ControlPanelHomePageElements/UpcomingBirthdays";
import MyAbsences from "../../components/ControlPanelHomePageElements/MyAbsences";
import PublicHolidays from "../../components/ControlPanelHomePageElements/PublicHolidays";
import UpcomingEvents from "../../components/ControlPanelHomePageElements/UpcomingEvents";
import axios from "axios";
import { getToken } from "../../utils/Utils";
import CustomClockLoader from "../../components/CustomLoader/CustomClockLoader";

function ControlPanelHomeView() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  let token = getToken();
  const [employeeData, setEmployeeData] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [remainingLeaveDays, setRemainingLeaveDays] = useState(0);
  const [leaveList, setLeaveList] = useState([]);

  const getData = async () => {
    try {
      const employeeResponse = await axios.get(
        `${apiBaseUrl}/Employee/employee-card`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const leaveCardResponse = await axios.get(
        `${apiBaseUrl}/Leave/MyLeaveCard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("leaveCardResponse", leaveCardResponse.data.leaves.$values);

      setEmployeeData(employeeResponse.data);
      setLeaveList(leaveCardResponse.data.leaves.$values);
      setRemainingLeaveDays(leaveCardResponse.data.remainingLeaveDays);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Data fetching is complete
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <CustomClockLoader />; // Loading indicator
  }

  return (
    <>
      <ProfileWidget employeeData={employeeData} />
      <MyAbsences remainingLeaveDays={remainingLeaveDays} leaveList={leaveList} />
      <UpcomingBirthdays />
      <PublicHolidays />
      <UpcomingEvents />
    </>
  );
}

export default ControlPanelHomeView;
