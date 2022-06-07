import React, { useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import Link from "next/link";

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
  const [open,setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const formRef = useRef();
  const handleAcceptSP = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    setOpen(true);
    console.log(formData.get("email"));
    const data = {
      "email" : formData.get("email")
    }
    fetch("/api/user/emp/approveEmp",{
      method:"POST",
      body: JSON.stringify(data)
    }).then((res)=>{
      fetch("/api/user/emp/getEmp", {
        method: "GET",
      })
        .then((res) => {
          res
            .json()
            .then((empsData) => {
              console.log(empsData);
              setEmpDetails((prevState) => {
                setOpen(false);
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
    }).catch(err=>{
      return;
    });
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
                  <form onSubmit={handleAcceptSP} key={item._id} ref={formRef}>
                  <input type="text" name="email" value={item.email} onChange={()=>{return;}} style={{
                    display:"none"
                  }}/>
                  Service Name : {item.serviceName}
                  <br />
                  {((item.verified!="not yet"))&&<a
                    href={window.URL.createObjectURL(
                      base64toBlob(item.pdf.data)
                    )}
                  >
                    View PDF
                  </a>}
                  {((item.verified!="verified")&&(item.verified!="not yet"))&&<Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Accept
                  </Button>}
                  </form>
                </div>
              </AccordionDetails>
            </Accordion>
        );
      })}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={()=>{return;}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
