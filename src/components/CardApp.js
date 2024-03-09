import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CardApp({
  text = "click",
  urlImage,
  handleOpen,
  routes,
}) {
  const isCustomized = routes === "custom";

  return (
    <Card
      onClick={handleOpen}
      sx={isCustomized ? { border: "2px solid blue" } : {}}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={isCustomized ? "200" : "140"}
          image={urlImage}
          alt="green iguana"
        />
        <CardContent sx={isCustomized ? { textAlign: "center" } : {}}>
          <Typography gutterBottom variant="h5" component="div">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
