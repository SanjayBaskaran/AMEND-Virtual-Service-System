import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import Link from 'next/link';
const base64toBlob = (data) => {
  const raw = window.atob(data);
  const rawLength = raw.length;
  const blobArray = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    blobArray[i] = raw.charCodeAt(i);
  }

  const blob = new Blob([blobArray], { type: "application/pdf" });
  return blob;
};
export default function SP() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [empDetails, setEmpDetails] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/user/emp/getEmp", {
      method: "GET",
    })
      .then((res) => {
        res
          .json()
          .then((empsData) => {
            console.log(empsData);
            setEmpDetails((prevState) => {
              return empsData.emps;
            });
          })
          .catch((err) => {
            return;
          });
      })
      .catch((err) => {
        return;
      });
  }, []);
  return (
    <>
      <form>
        {empDetails.map((item) => {
          return (
            <Accordion
              key={item._id}
              expanded={expanded === item._id}
              onChange={handleChange(item._id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {item.email}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {/* I will do {item.serviceName} */}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    width: "70vw",
                  }}
                >
                  
                  Service Name : {item.serviceName}
                  <br/>
                    <a href={window.URL.createObjectURL(base64toBlob(item.pdf.data))}>
                    View PDF
                    </a>
                  
                    
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </form>
    </>
  );
}
