import React, { useEffect, useState } from "react";
import ExpandedProfileWidget from "../../components/ControlPanelProfilePageElements/ExpandedProfileWidget";
import CommunicationWidget from "../../components/ControlPanelProfilePageElements/CommunicationWidget";
import AbstractShapeA from "../../components/ControlPanelProfilePageElements/AbstractShapeA";
import AbstractShapeB from "../../components/ControlPanelProfilePageElements/AbstractShapeB";
import SupportWidget from "../../components/ControlPanelProfilePageElements/SupportWidget";
import axios from "axios";
import { getToken } from "../../utils/Utils";
import CustomClockLoader from "../../components/CustomLoader/CustomClockLoader";

function ControlPanelProfileView() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  let token = getToken();
  const [employeeCardData, setEmployeeCardData] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  const getData = async () => {
    try {
      const employeeCardResponse = await axios.get(
        `${apiBaseUrl}/Employee/employee-card`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployeeCardData(employeeCardResponse.data);
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
      <ExpandedProfileWidget employeeCardData={employeeCardData} />
      <CommunicationWidget />
      <SupportWidget />
    </>
  );
}

export default ControlPanelProfileView;
