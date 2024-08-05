import { useState } from 'react'
import { Box } from '@mui/material';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const Start = ({ setTitle }) => {
  const navigate = useNavigate();
  const perspectivaBox = {
    width: 300,
    height: 110,
    borderRadius: 1,
    bgcolor: 'primary.main',
    '&:hover': {
      bgcolor: 'primary.dark',
    },
  }

  const handleBoxClick = (perspectiveName) => {
    setTitle(perspectiveName);
    navigate('/BalancedScorecard/perspective', { state: { perspectiveName } });
  };

  return (
    <div id="perspectivas">
      <div>
        <Box className="perspectiva" sx={perspectivaBox} onClick={() => handleBoxClick('PERSPECTIVA FINANCIERA')}>
          PERSPECTIVA FINANCIERA
        </Box>
        <Box className="perspectiva" sx={perspectivaBox} onClick={() => handleBoxClick('PERSPECTIVA DE PROCESOS INTERNOS')}>
          PERSPECTIVA DE PROCESOS INTERNOS
        </Box>
      </div>
      <div>
        <Box className="perspectiva" sx={perspectivaBox} onClick={() => handleBoxClick('PERSPECTIVA DEL CLIENTE')}>
          PERSPECTIVA DEL CLIENTE
        </Box>
        <Box className="perspectiva" sx={perspectivaBox} onClick={() => handleBoxClick('PERSPECTIVA DE APRENDIZAJE Y DESARROLLO')}>
          PERSPECTIVA DE APRENDIZAJE Y DESARROLLO
        </Box>
      </div>
    </div>
  );
};

export default Start;