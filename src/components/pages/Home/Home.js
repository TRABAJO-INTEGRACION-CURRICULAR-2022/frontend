import React, { useState, useEffect } from "react";

import Informacion from "./Informacion";
import VerInformacion from "./VerInformacion";

const jsonDataConsentimiento = [
  {
    titulo: "titulo1",
    valor: "valor1",
  },
  {
    titulo: "titulo2",
    valor: "valor2",
  },
  {
    titulo: "titulo3",
    valor: "valor3",
  },
  {
    titulo: "titulo4",
    valor: "valor4",
  },
];

const jsonDataInformacion = [
  {
    titulo: "titulo1",
    valor: "valor1",
  },
  {
    titulo: "titulo2",
    valor: "valor2",
  },
  {
    titulo: "titulo3",
    valor: "valor3",
  },
  {
    titulo: "titulo4",
    valor: "valor4",
  },
];
const Home = () => {
  const [data, setData] = useState([]);
  const [dataConsentimiento, setDataConsentimiento] = useState({});
  const [dataInformacion, setDataInformacion] = useState({});

  const [mostrarInformacion, setMostrarInformacion] = useState(false);

  useEffect(() => {
    const jsonData = [
      {
        id: 1,
        nombreEmpresa: "Empresa 1",
        fechaCaducidad: "2021-01-01",
      },
      {
        id: 2,
        nombreEmpresa: "Empresa 2",
        fechaCaducidad: "2021-01-01",
      },
      {
        id: 3,
        nombreEmpresa: "Empresa 3",
        fechaCaducidad: "2021-01-01",
      },
    ];

    setData(jsonData);
  }, []);

  const handleVerDatos = (id) => {
    console.log(id);
    setMostrarInformacion(true);
  };

  const informacion = () => {
    return (
      <div>
        <h1>Home</h1>
        <div className="d-flex justify-content-around"></div>
        {data.map((item) => (
          <Informacion
            key={item.id}
            item={item}
            handleVerDatos={handleVerDatos}
          />
        ))}
      </div>
    );
  };

  const verDatos = (id) => {
    return (
      <div>
        <h1>Ver datos</h1>
        <div className="p-3 d-flex justify-content-end ">
          <button
            className="m-2 btn btn-secondary"
            onClick={() => {
              setMostrarInformacion(false);
            }}
          >
            Cancelar
          </button>
          <button className="m-2 btn btn btn-primary">Exportar</button>
          <button className="m-2 btn btn-warning">Editar</button>
        </div>

        <div className="container d-flex justify-content-around">
          <div className="row">
            <div className="col">
              <div className="bg-white rounded p-3">
                <h3>Consentimiento</h3>
                {jsonDataConsentimiento.map((item) => (
                  <VerInformacion key={item.tirulo} item={item} />
                ))}
              </div>
            </div>
            <div className="col">
              <div className="bg-white rounded p-3">
                <h3>Informacion</h3>
                {jsonDataInformacion.map((item) => (
                  <VerInformacion key={item.tirulo} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{mostrarInformacion ? verDatos() : informacion()}</>;
};

export default Home;
