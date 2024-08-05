import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const perspectiveData = {
    'PERSPECTIVA FINANCIERA': [
      'Lograr una utilidad neta del 8% de las ventas totales para el año siguiente',
      'Crecimiento del 10% de las ventas',
    ],
    'PERSPECTIVA DEL CLIENTE': [
      'Mejorar la satisfacción de los clientes',
      'Maximizar la rentabilidad por cliente',
      'Ampliar la cartera de clientes',
    ],
    'PERSPECTIVA DE PROCESOS INTERNOS': [
      'Mejorar la calidad del producto',
      'Mejorar la gestión de almacenamiento',
      'Elevar la eficiencia operativa',
    ],
    'PERSPECTIVA DE APRENDIZAJE Y DESARROLLO': [
      'Elevar la productividad de los colaboradores',
    ],
  };

const Perspective = ({setTitle, setObjective}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { perspectiveName } = location.state || { perspectiveName: 'No Perspective Selected' };
  
  const handleObjectiveClick = (objective) => {
    setTitle(`${perspectiveName}`);
    setObjective(objective);
    navigate('/BalancedScorecard/perspective/objective', { state: { perspectiveName, objective } });
  };

  // Obtén los datos correspondientes a la perspectiva seleccionada
  const items = perspectiveData[perspectiveName] || ['No data available'];

  return (
      <div id='objectives'>
        <Typography variant="h5" gutterBottom>
        Objetivos:
        </Typography>
        {items.map((item, index) => (
          <Box
            key={index}
            className='objetive'
            sx={{
              width: 350,
              height: 80,
              margin: 1,
              bgcolor: '#42a5f5',
              '&:hover': {
                bgcolor: '#2196f3',
              },
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 1,
            }}
            onClick={() => handleObjectiveClick(item)}
          >
            {item}
          </Box>
        ))}
      </div>
  );
};

export default Perspective;