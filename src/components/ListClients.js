import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export default function ListClients() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/clientes`
        );
        setClientes(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div style={{ maxHeight: "60vh", overflow: "auto" }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Typography
            component="h5"
            variant="h5"
            color="text.primary"
            sx={{ mb: 2 }}
          >
            Lista de Clientes
          </Typography>
          {clientes.length > 0 ? (
            clientes.map((cliente, index) => (
              <React.Fragment key={cliente.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={cliente.nome}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "block" }}
                          variant="body2"
                          color="text.primary"
                        >
                          {cliente.email} - {cliente.telefone}
                        </Typography>
                        <Typography
                          sx={{ display: "block" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          Coordenadas: [{cliente.coordenadaX},{" "}
                          {cliente.coordenadaY}]
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {/* Adiciona o Divider apenas se não for o último item da lista */}
                {index !== clientes.length - 1 && (
                  <Divider
                    variant="inset"
                    component="li"
                    sx={{ width: "95%", mx: "auto" }}
                  />
                )}
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
              Não há cliente cadastrado.
            </Typography>
          )}
        </List>
      )}
    </div>
  );
}
