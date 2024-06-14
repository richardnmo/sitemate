import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../const";

import Issues from "../components/issues";

export default function Dashboard() {
  // const [selected, setSelected] = React.useState([]);
  const [issues, setIssues] = React.useState([]);

  React.useEffect(() => {
    getIssues();
  }, []);

  const getIssues = async () => {
    try {
      const resp = await axios.get(`${apiBaseUrl}/issues`);
      console.log(resp);
      setIssues(resp.data);
    } catch (e) {
      alert(`Status Code ${e.data.status} : ${e.data.error}`, "error");
    }
  };

  return (
    <div align="center">
      <h1>Issues</h1>
      <Issues issues={issues} />
    </div>
  );
}
