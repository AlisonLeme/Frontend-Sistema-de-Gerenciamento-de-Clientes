import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Box from "@mui/material/Box";

const SearchClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchClients = async () => {
      setLoading(true);
      if (!searchTerm.trim()) {
        setSearchResult([]);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/clientes/${searchTerm}`
        );
        setSearchResult(response.data);
        setError(null);
      } catch (error) {
        console.error("Erro ao pesquisar clientes:", error);
        setSearchResult([]);
        setError("Nenhum cliente encontrado.");
      } finally {
        setLoading(false);
      }
    };

    searchClients();
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box height={400} overflow="auto">
      <Typography
        component="h5"
        variant="h5"
        color="text.primary"
        sx={{ mb: 2 }}
      >
        Procura de Clientes
      </Typography>
      <TextField
        id="outlined-basic"
        label="Nome, Telefone ou Email"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => {}} size="large">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {error && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        {searchResult.length > 0
          ? `${searchResult.length} cliente(s) encontrado(s)`
          : ""}
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {searchResult.map((cliente) => (
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
                      Coordenadas: [{cliente.coordenadaX}, {cliente.coordenadaY}
                      ]
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default SearchClient;
