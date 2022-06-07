import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
// import { Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";

const base64toBlob = (data) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data;

  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  let out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: "application/pdf" });
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
                <Button variant="contained">View PDF</Button>
                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    width: "100%",
                  }}
                >
                  <iframe
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.3)",
                      width: "80vw",
                      height:"70vh"
                    }}
                    src={"data:application/pdf;base64," + item.pdf.data}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </form>
    </>
  );
}
