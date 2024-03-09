import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Container, Divider } from "@mui/material";

import Header from "./components/Header";
import CardApp from "./components/CardApp";
import FlexModal from "./components/FlexModal";
import Footer from "./components/Footer";

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState();
  const handleOpen = (type) => {
    setOpen(true);
    setType(type);
  };
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header text={"Sistema de controle de clientes"} />
      <Container sx={{ mt: 8, mb: 8 }}>
        <Typography
          component="h2"
          variant="h4"
          color="text.primary"
          sx={{ mb: 8 }}
          textAlign={"center"}
        >
          Bem vindo(a)!
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CardApp
                text="Listar Clientes"
                urlImage={
                  "https://0grados.com/admin/wp-content/uploads/2015/12/A0CG0001872.jpg"
                }
                handleOpen={() => handleOpen("listClients")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CardApp
                text="Procurar Cliente"
                urlImage={
                  "https://blog.gazinatacado.com.br/wp-content/uploads/2017/04/como-lidar-com-diferentes-tipos-de-clientes-2.png"
                }
                handleOpen={() => handleOpen("searchClient")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CardApp
                text="Cadastrar Clientes"
                urlImage={
                  "https://blog.debmedia.com/wp-content/uploads/2021/03/21-04-01-Compromiso-con-el-Cliente-pre.jpg"
                }
                handleOpen={() => handleOpen("registerClients")}
              />
            </Grid>
          </Grid>
          <Box sx={{ my: 6 }}>
            <Divider />
          </Box>
          <CardApp
            text="Rota de Entregas"
            urlImage={
              "https://www.vuupt.com/wp-content/uploads/2020/09/calcular-rota-de-entrega-1.png"
            }
            handleOpen={() => handleOpen("tracesRoutes")}
            routes={"custom"}
          />
        </Box>
        <FlexModal open={open} handleClose={handleClose} type={type} />
      </Container>
      <Footer />
    </Box>
  );
}
