import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
const Input = styled("input")({
  display: "none",
});

export default function UploadButtons() {
  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Typography variant="body2">
        Upload any document for verification (aadhar card/driving license)
      </Typography>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
        />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
    </Stack>
  );
}
