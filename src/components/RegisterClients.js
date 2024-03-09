import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import axios from "axios";

const RegisterClients = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    coordenadaX: "",
    coordenadaY: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Limita o número de caracteres para telefone
    if (name === "telefone" && value.length > 15) {
      return;
    }

    let formattedValue = value;

    if (name === "telefone") {
      // Formata o telefone enquanto o usuário digita
      formattedValue = formatPhoneNumber(value);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Validação dos campos antes de formatar
    if (!isValidEmail(formData.email)) {
      setErrorMessage("Por favor, insira um email válido.");
      setLoading(false);
      return;
    }

    if (!isValidPhone(formData.telefone)) {
      setErrorMessage("Por favor, insira um telefone válido.");
      setLoading(false);
      return;
    }

    // Formata os dados antes de enviar
    const formattedData = {
      ...formData,
      telefone: unformatPhoneNumber(formData.telefone), // Remove formatação do telefone
      coordenadaX: parseFloat(formData.coordenadaX), // Converte para float
      coordenadaY: parseFloat(formData.coordenadaY), // Converte para float
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/clientes`,
        formattedData
      );
      setSuccessMessage("Cliente registrado com sucesso!");
      setErrorMessage("");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        coordenadaX: "",
        coordenadaY: "",
      });
      setShowAlert(true); // Exibe o alerta de sucesso
    } catch (error) {
      console.error("Erro ao registrar cliente:", error);
      setSuccessMessage("");
      setErrorMessage("Erro ao registrar cliente. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email) => {
    // Expressão regular para validar o email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPhone = (phone) => {
    // Expressão regular para validar o telefone
    const regex = /^\([1-9]{2}\) (?:9\d{4}-\d{4}|\d{4}-\d{4})$/;
    return regex.test(phone);
  };

  const formatPhoneNumber = (phoneNumber) => {
    // Formata o telefone para o padrão (00) 00000-0000
    return phoneNumber
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
  };

  const unformatPhoneNumber = (formattedPhoneNumber) => {
    // Remove a formatação do telefone
    return formattedPhoneNumber.replace(/\D/g, "");
  };

  return (
    <div>
      <Typography
        component="h5"
        variant="h5"
        color="text.primary"
        sx={{ mb: 2 }}
      >
        Cadastrar Clientes
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            name="nome"
            label="Nome"
            variant="outlined"
            fullWidth
            required
            value={formData.nome}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            name="telefone"
            label="Telefone"
            variant="outlined"
            fullWidth
            required
            value={formData.telefone}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            name="coordenadaX"
            label="Coordenada X"
            variant="outlined"
            fullWidth
            required
            type="number"
            value={formData.coordenadaX}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            name="coordenadaY"
            label="Coordenada Y"
            variant="outlined"
            fullWidth
            required
            type="number"
            value={formData.coordenadaY}
            onChange={handleChange}
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Registrar"
            )}
          </Button>
        </Box>
      </form>
      <Slide direction="down" in={showAlert} mountOnEnter unmountOnExit>
        <Box mt={2} mb={2}>
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            autoHideDuration={3000}
            onClose={() => setShowAlert(false)}
          >
            {successMessage}
          </Alert>
        </Box>
      </Slide>
      {errorMessage && (
        <Box mt={2} mb={2}>
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}
    </div>
  );
};

export default RegisterClients;
