import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Stage, Layer, Circle, Text, Line } from "react-konva";

const TracesRoutes = () => {
  const [routeData, setRouteData] = useState(null);
  const [mapWidth, setMapWidth] = useState(0);
  const [mapHeight, setMapHeight] = useState(0);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/rota`
        );
        setRouteData(response.data);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchData();

    // Estabelecer uma conexão WebSocket para receber atualizações em tempo real
    const ws = new WebSocket(`${process.env.REACT_APP_WEB_SOCKET}`);
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setRouteData(newData);
    };

    // Função de limpeza
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const calculateHeights = () => {
      // Pegar a altura disponível da tela
      const availableHeight = window.innerHeight;

      // Calcular a altura do mapa
      const mapHeight = availableHeight * 0.8;
      setMapHeight(mapHeight);

      // Calcular a largura do mapa
      const mapWidth = document.getElementById("map-container").offsetWidth;
      setMapWidth(mapWidth);

      // Calcular o fator de escala com uma margem
      if (routeData) {
        const maxX = Math.max(
          ...routeData.rota.map((client) => client.coordenadaX)
        );
        const maxY = Math.max(
          ...routeData.rota.map((client) => client.coordenadaY)
        );
        const maxCoord = Math.max(maxX, maxY);
        const marginFactor = 0.1; // Ajuste a margem conforme necessário
        setScale(mapWidth / (maxCoord * marginFactor));
      }
    };

    // Chamar a função de cálculo de alturas quando a janela for redimensionada
    window.addEventListener("resize", calculateHeights);
    calculateHeights(); // Chamar a função também quando o componente for montado

    // Remover o event listener quando o componente for desmontado
    return () => window.removeEventListener("resize", calculateHeights);
  }, [routeData]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleZoom = (e) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setScale(newScale);
    stage.scale({ x: newScale, y: newScale });
    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} style={{ height: "100%" }}>
          <Typography variant="h6" align="center">
            Mapa
          </Typography>
          <div
            id="map-container"
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {routeData && routeData.rota.length > 0 ? (
              <Stage
                width={mapWidth}
                height={mapHeight}
                draggable
                onWheel={handleZoom}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <Layer>
                  {/* Desenhar linha conectando os pontos da rota */}
                  {routeData &&
                    routeData.rota.map(
                      (client, index) =>
                        index < routeData.rota.length - 1 && (
                          <React.Fragment key={index}>
                            <Line
                              points={[
                                mapWidth / 2 + client.coordenadaX * scale,
                                mapHeight / 2 - client.coordenadaY * scale,
                                mapWidth / 2 +
                                  routeData.rota[index + 1].coordenadaX * scale,
                                mapHeight / 2 -
                                  routeData.rota[index + 1].coordenadaY * scale,
                              ]}
                              stroke="black"
                              strokeWidth={1}
                              dash={[5, 5]}
                            />
                          </React.Fragment>
                        )
                    )}
                  {/* Desenhar os clientes no mapa */}
                  {routeData &&
                    routeData.rota.map((client, index) => (
                      <React.Fragment key={index}>
                        <Circle
                          x={mapWidth / 2 + client.coordenadaX * scale}
                          y={mapHeight / 2 - client.coordenadaY * scale}
                          radius={5}
                          fill={client.nome === "Empresa" ? "blue" : "green"}
                          draggable
                        />
                        {/* Texto com nome e coordenadas */}
                        <Text
                          x={mapWidth / 2 + client.coordenadaX * scale + 10}
                          y={mapHeight / 2 - client.coordenadaY * scale - 20}
                          text={`${client.nome} (${client.coordenadaX}, ${client.coordenadaY})`}
                          fill="#333"
                          fontSize={10}
                        />
                      </React.Fragment>
                    ))}
                </Layer>
              </Stage>
            ) : (
              <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                Não há entregas cadastradas.
              </Typography>
            )}
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3}>
          <Typography variant="h6" align="center" gutterBottom>
            Ordem de Entrega
          </Typography>
          <div style={{ height: "70vh", overflow: "auto" }}>
            {routeData && routeData.rota.length > 0 ? (
              <List>
                {routeData &&
                  routeData.rota.map((client, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={client.nome}
                          secondary={
                            <React.Fragment>
                              {client.nome !== "Empresa" && (
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                >
                                  Telefone: {client.telefone}
                                  <br />
                                </Typography>
                              )}
                              {client.nome !== "Empresa" && (
                                <Typography variant="body2" color="textPrimary">
                                  Distância: {client.distancia.toFixed(2)} km
                                  <br />
                                </Typography>
                              )}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {index !== routeData.rota.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
              </List>
            ) : (
              <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                Não há entregas cadastradas.
              </Typography>
            )}
          </div>
          {routeData && routeData.rota.length > 0 && (
            <React.Fragment>
              <Divider />
              <Typography variant="subtitle1" align="center">
                Distância de Ida: {routeData.distanciaIda.toFixed(2)} km
              </Typography>
              <Divider />
              <Typography variant="subtitle1" align="center">
                Distância de Volta: {routeData.distanciaVolta.toFixed(2)} km
              </Typography>
              <Divider />
              <Typography variant="subtitle1" align="center">
                Distância Total: {routeData.distanciaTotal.toFixed(2)} km
              </Typography>
            </React.Fragment>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TracesRoutes;
