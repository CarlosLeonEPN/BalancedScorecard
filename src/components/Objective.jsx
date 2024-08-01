import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, TextField, Typography, Button } from '@mui/material';

const objectiveData = {
    'Lograr una utilidad neta del 8% de las ventas totales para el año siguiente': [
      { label: 'Utilidad neta anual año x', type: 'number', key: 'utilidadNetaAnualX'},
      { label: 'Venta anual año x', type: 'number', key: 'ventaAnualX'},
    ],
    'Crecimiento del 10% de las ventas': [
      { label: 'Venta anual año 1', type: 'number', key: 'ventaAnual1' },
      { label: 'Venta anual año 2', type: 'number', key: 'ventaAnual2'},
    ],
    'Mejorar la satisfacción de los clientes': [
        { label: 'Total de devoluciones por cliente', type: 'number', key: 'totalDevolucionesCliente'},
        { label: 'Total de pedidos por cliente', type: 'number', key: 'totalPedidosCliente'},
    ],
    'Maximizar la rentabilidad por cliente': [
        { label: 'Total de gasto de venta por cliente', type: 'number', key: 'totalGastoVenta'},
        { label: 'Monto de venta por cliente', type: 'number', key: 'montoVentaCliente'},
    ],
    'Ampliar la cartera de clientes': [
        { label: 'Nuevos clientes', type: 'number', key: 'nuevosClientes'},
        { label: 'Total de clientes', type: 'number', key: 'totalClientes'},
    ],
    'Mejorar la calidad del producto': [
        { label: 'N.° de alianzas con proveedores clave', type: 'number', key: 'nAlianzasProveedores'},
        { label: ' Total de proveedores', type: 'number', key: 'totalProveedores'},
    ],
    'Mejorar la gestión de almacenamiento': [
        { label: 'Inventario dañado (%) ', type: 'number', key: 'inventarioDanado'},
        { label: 'Total inventario', type: 'number', key: 'totalInventario'},
    ],
    'Elevar la eficiencia operativa': [
        { label: 'N.° de horas utilizadas en la producción', type: 'number', key: 'nHorasProduccion'},
        { label: 'N.° de horas planificadas', type: 'number', key: 'nHorasPlanificadas'},
    ],
    'Elevar la productividad de los colaboradores': [
        { label: 'Utilidad neta anual', type: 'number', key: 'utilidadNetaAnual'},
        { label: 'N.° de trabajadores', type: 'number', key: 'nTrabajadores'},
    ],
  };


const colorRanges = {
    'Lograr una utilidad neta del 8% de las ventas totales para el año siguiente': [
      { min: -Infinity, max: 2, color: '#ff1d1d' },
      { min: 2, max: 8, color: 'yellow' },
      { min: 8, max: Infinity, color: '#64ef4f' },
    ],
    'Crecimiento del 10% de las ventas': [
      { min: -Infinity, max: 5, color: '#ff1d1d' },
      { min: 5, max: 10, color: 'yellow' },
      { min: 10, max: Infinity, color: '#64ef4f' },
    ],
    'Mejorar la satisfacción de los clientes': [
      { min: -Infinity, max: 2, color: '#64ef4f' },
      { min: 2, max: 5, color: 'yellow' },
      { min: 5, max: Infinity, color: '#ff1d1d' },
    ],
    'Maximizar la rentabilidad por cliente': [
      { min: -Infinity, max: 25, color: '#64ef4f' },
      { min: 25, max: 40, color: 'yellow' },
      { min: 40, max: Infinity, color: '#ff1d1d' },
    ],
    'Ampliar la cartera de clientes': [
      { min: -Infinity, max: 10, color: '#ff1d1d' },
      { min: 10, max: 20, color: 'yellow' },
      { min: 20, max: Infinity, color: '#64ef4f' },
    ],
    'Mejorar la calidad del producto': [
      { min: -Infinity, max: 1, color: '#ff1d1d' },
      { min: 2, max: 3, color: 'yellow' },
      { min: 3, max: Infinity, color: '#64ef4f' },
    ],
    'Mejorar la gestión de almacenamiento': [
      { min: -Infinity, max: 3, color: '#64ef4f' },
      { min: 3, max: 5, color: 'yellow' },
      { min: 5, max: Infinity, color: '#ff1d1d' },
    ],
    'Elevar la eficiencia operativa': [
      { min: -Infinity, max: 120, color: '#64ef4f' },
      { min: 120, max: 130, color: 'yellow' },
      { min: 130, max: Infinity, color: '#ff1d1d' },
    ],
    'Elevar la productividad de los colaboradores': [
      { min: -Infinity, max: 300, color: 'red' },
      { min: 301, max: 999, color: 'yellow' },
      { min: 999, max: Infinity, color: '##ff1d1d' },
    ],
  };

const calculate = (objective, values) => {
    let result = 0;
    let indicador = '';
    switch (objective) {
      case 'Lograr una utilidad neta del 8% de las ventas totales para el año siguiente':
        const utilidadNetaAnualX = parseFloat(values.utilidadNetaAnualX) || 0;
        const ventaAnualX = parseFloat(values.ventaAnualX) || 0;
        result = (utilidadNetaAnualX/ ventaAnualX)*100;
        indicador= 'Utilidad neta anual';
        break;
  
      case 'Crecimiento del 10% de las ventas':
        const ventaAnual1 = parseFloat(values.ventaAnual1) || 0;
        const ventaAnual2 = parseFloat(values.ventaAnual2) || 0;
        result = ((ventaAnual2 - ventaAnual1)/ventaAnual1)*100;
        indicador= 'Venta anual';
        break;

      case 'Mejorar la satisfacción de los clientes':
        const totalDevolucionesCliente = parseFloat(values.totalDevolucionesCliente) || 0;
        const totalPedidosCliente = parseFloat(values.totalPedidosCliente) || 0;
        result = (totalDevolucionesCliente/totalPedidosCliente)*100;
        indicador= 'Porcentaje de devoluciones de productos';
        break;
      
      case 'Maximizar la rentabilidad por cliente':
        const totalGastoVenta = parseFloat(values.totalGastoVenta) || 0;
        const montoVentaCliente = parseFloat(values.montoVentaCliente) || 0;
        result = (totalGastoVenta/montoVentaCliente)*100;
        indicador= 'Rentabilidad por cliente';
        break;
      
      case 'Ampliar la cartera de clientes':
        const nuevosClientes = parseFloat(values.nuevosClientes) || 0;
        const totalClientes = parseFloat(values.totalClientes) || 0;
        result = (nuevosClientes/totalClientes)*100;
        indicador= 'Nuevos clientes';
        break;
      
      case 'Mejorar la calidad del producto':
        const nAlianzasProveedores = parseFloat(values.nAlianzasProveedores) || 0;
        const totalProveedores = parseFloat(values.totalProveedores) || 0;
        result = nAlianzasProveedores/totalProveedores;
        indicador= 'Alianzas con aliados claves';
        break;
      
      case 'Mejorar la gestión de almacenamiento':
        const inventarioDanado = parseFloat(values.inventarioDanado) || 0;
        const totalInventario = parseFloat(values.totalInventario) || 0;
        result = (inventarioDanado/totalInventario)*100;
        indicador= 'Pérdida de productos terminados';
        break;
      
      case 'Elevar la eficiencia operativa':
        const nHorasProduccion = parseFloat(values.nHorasProduccion) || 0;
        const nHorasPlanificadas = parseFloat(values.nHorasPlanificadas) || 0;
        result = (nHorasProduccion/nHorasPlanificadas)*100;
        indicador= 'Planificación horas hombre';
        break;
      
      case 'Elevar la productividad de los colaboradores':
        const utilidadNetaAnual = parseFloat(values.utilidadNetaAnual) || 0;
        const nTrabajadores = parseFloat(values.nTrabajadores) || 0;
        result = (utilidadNetaAnual/nTrabajadores)*100;
        indicador= 'Productividad de los colaboradores';
        break;
      default:
        result = 0;
        alert('Objetivo no definido para el cálculo.');
    }

    const ranges = colorRanges[objective] || [];
    let backgroundColor = 'white'; // Color por defecto
    if(!isNaN(result)){
      for (let range of ranges) {
        if (result >= range.min && result < range.max) {
          backgroundColor = range.color;
          break;
        }
      }
    }
    else{
      result=null;
    }
    return { result, backgroundColor, indicador};
};

const Objective = ({setTitle, setObjective}) => {
  const location = useLocation();
  const { perspectiveName, objective } = location.state || { perspectiveName: 'No Perspective', objective: 'No Objective' };
  const [result, setResult] = useState(null);
  const [indicador, setIndicador] = useState('');

  //

  useEffect(()=>{
  },[result])

  const [backgroundColor, setBackgroundColor] = useState('white');

  const elements = objectiveData[objective] || [];
  const [values, setValues] = useState(() => {
    // Inicializa el estado de los datos con valores vacíos
    const initialValues = {};
    elements.forEach(({ key }) => {
      initialValues[key] = '';
    });
    return initialValues;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
    setResult(null);
  };

  const handleCalculate = () => {
    const { result, backgroundColor, indicador } = calculate(objective, values);
    console.log('result', result);
    if(result != null && result != undefined){
      setResult(result);
      setBackgroundColor(backgroundColor);
      setIndicador(indicador)
      console.log(result);
      console.log(backgroundColor);
    } else {
      return;
    }
    
  };

  return (
    <div id='data'>
      <Typography variant="h5" gutterBottom>
        Ingrese la siguiente información:
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {elements.map((item, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <TextField
              label={item.label}
              type={item.type}
              fullWidth
              variant="outlined"
              name={item.key}
              value={values[item.key] || ''}
              onChange={handleChange}
              required
            />
          </Box>
        ))}
      </div>
      <Button variant="contained" color="primary" onClick={handleCalculate}>
        Calcular
      </Button>
      {result != null && (
        <Box mt={4} p={3} border={0} borderRadius={4} bgcolor={backgroundColor} id='result'>
          <Typography variant="h6" color='black'>
            {indicador}: {result.toFixed(2)}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Objective;
