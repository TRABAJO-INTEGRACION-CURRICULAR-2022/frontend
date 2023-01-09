import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Select from "react-select";

import empresaTratamientosService from "../../../../../services/empresaTratamientos";

import empresaCorreoService from "../../../../../services/empresaCorreos";

import Tratamiento from "./Tratamiento";
import TratamientoInformacion from "./TratamientoInformacion";

const Inicio = () => {
  const [data, setData] = useState([]);

  const [mostrarInformacion, setMostrarInformacion] = useState(false);

  const [dataTratamiento, setDataTratamiento] = useState({});

  const [tratamientoSolicitado, setTratamientoSolicitado] = useState({});

  const [fechaFin, setFechaFin] = useState("");

  const [filter, setFilter] = useState("Por Persona");

  const [filtroSeleccionado, setFiltroSeleccionado] = useState("Todos");

  const [opcionesFiltro, setOpcionesFiltro] = useState([
    {
      value: "Todos",
      label: "Todos",
    },
  ]);

  const [opcionesFitrolPersona, setOpcionesFiltroPersona] = useState([
    {
      value: "Todos",
      label: "Todos",
    },
  ]);

  const [opcionesFiltroTratamiento, setOpcionesFiltroTratamiento] = useState(
    []
  );

  useEffect(() => {
    empresaTratamientosService.getAll().then((tratamientos) => {
      setData(tratamientos);
      console.log("tratamientos recuperados: ", tratamientos);
      let newOpcionesFiltro = tratamientos.map((tratamiento) => {
        return {
          value: tratamiento.id_consent,
          label: `${tratamiento.name} ${tratamiento.lastname}`,
        };
      });
      console.log("newOpcionesFiltro: ", newOpcionesFiltro);
      newOpcionesFiltro = [
        {
          value: "Todos",
          label: "Todos",
        },
        ...newOpcionesFiltro,
      ];
      setOpcionesFiltroPersona(newOpcionesFiltro);
      setOpcionesFiltro(newOpcionesFiltro);
    });
  }, []);

  const handleVerDatos = (id) => {
    console.log(`handle ver datos empresa id: ${id}`);
    empresaTratamientosService.getOne(id).then((tratamiento) => {
      setTratamientoSolicitado(tratamiento);
      console.log("tratamiento recuperado: ", tratamiento);

      let dataTratamientoTemporal = {};

      tratamiento.consent.data.forEach((tratamiento) => {
        const newData = {
          [tratamiento.tipo]: tratamiento.valor,
        };
        dataTratamientoTemporal = { ...dataTratamientoTemporal, ...newData };
      });

      setDataTratamiento(dataTratamientoTemporal);
      console.log("dataTratamientoTemporal: ", dataTratamientoTemporal);
      setMostrarInformacion(true);

      const fechaArray = tratamiento.fechaFinConsentimeinto.split("/");
      const fechaFinTratamiento = `${fechaArray[2]}-${fechaArray[1]}-${fechaArray[0]}`;
      console.log("fechaFinTratamiento: ", fechaFinTratamiento);
      setFechaFin(fechaFinTratamiento);
    });
  };

  const handleFilter = (valor) => {
    console.log("e.target.value: ", valor);
    setFilter(valor);

    if (valor === "Por Persona") {
      console.log("filtro por persona");
      setOpcionesFiltro(opcionesFitrolPersona);
    } else {
      console.log("filtro por tratamiento");
      if (opcionesFiltroTratamiento.length > 0) {
        setOpcionesFiltro(opcionesFiltroTratamiento);
      } else {
        empresaCorreoService.getAllTreatments().then((tratamientos) => {
          console.log("tratamientos: ", tratamientos);
          const newOpcionesFiltro = tratamientos.map((tratamiento) => {
            return {
              value: tratamiento._id,
              label: tratamiento.name,
            };
          });
          setOpcionesFiltroTratamiento(newOpcionesFiltro);
          setOpcionesFiltro(newOpcionesFiltro);
        });
      }
    }
  };

  const handleButtonFiltrar = () => {
    if (filter === "Por Persona") {
      console.log("boton filtrar por persona");
      if (filtroSeleccionado === "Todos") {
        console.log("entro todos");
        empresaTratamientosService.getAll().then((tratamientos) => {
          setData(tratamientos);
          console.log("tratamientos recuperados: ", tratamientos);
        });
      } else {
        console.log("filtroSeleccionado: ", filtroSeleccionado);
        handleVerDatos(filtroSeleccionado);
      }
    } else {
      console.log("boton filtrar por Tratamiento");
      //TODO: filtrar por tratamiento
      //mostar usuarios que tienen ese tratamiento
    }
  };

  const tratamiento = () => {
    return (
      <div>
        <h1>Informacion</h1>
        <h2>Usuario: {tratamientoSolicitado.consent.usuario.name}</h2>
        <div className="p-3 d-flex justify-content-end ">
          <div>
            <button
              className="m-2 btn btn-secondary"
              onClick={() => {
                setMostrarInformacion(false);
              }}
            >
              Cancelar
            </button>
            <button className="m-2 btn btn-primary" onClick={() => {}}>
              Exportar
            </button>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="bg-white rounded p-3">
                <h3>Tratamiento</h3>
                <h3>Fecha Fin</h3>
                <div>
                  <input type={"date"} value={fechaFin} disabled={true}></input>
                </div>
                {tratamientoSolicitado.consent.permisos.map(
                  (permiso, index) => (
                    <TratamientoInformacion key={index} item={permiso} />
                  )
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="bg-white rounded p-3">
                <h3>Datos</h3>
                <form>
                  {tratamientoSolicitado.consent.data.map((itemData, index) => (
                    <div key={index} className="mb-3">
                      <label className="form-label" htmlFor={index}>
                        {itemData.tipo}:{" "}
                      </label>
                      <input
                        className="form-control"
                        id={index}
                        name={index}
                        value={dataTratamiento[itemData.tipo]}
                        readOnly={true}
                      ></input>
                    </div>
                  ))}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tratamientos = () => {
    return (
      <div>
        <div>
          <h1>Filtro: </h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Check
              value="Por Persona"
              type="radio"
              label="Por Persona"
              onChange={(e) => handleFilter(e.target.value)}
              checked={filter === "Por Persona" ? true : false}
            />
            <Form.Check
              value="Por Tratamiento"
              type="radio"
              label="Por Tratamiento"
              onChange={(e) => handleFilter(e.target.value)}
              checked={filter === "Por Tratamiento" ? true : false}
            />
          </Form.Group>
          <Select
            options={opcionesFiltro}
            onChange={(e) => {
              console.log("e: ", e);
              setFiltroSeleccionado(e.value);
            }}
          ></Select>
          <button
            className="m-2 btn btn-primary"
            onClick={() => {
              handleButtonFiltrar();
            }}
          >
            Filtrar
          </button>
        </div>
        <h1>Tratamientos</h1>
        <div className="d-flex justify-content-around"></div>
        {data.length > 0 ? (
          data.map((tratamiento) => (
            <Tratamiento
              key={tratamiento.id_consent}
              item={tratamiento}
              handleVerDatos={handleVerDatos}
            />
          ))
        ) : (
          <div className="alert alert-warning" role="alert">
            No existen Tratamientos por el momento
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Inicio Empresa (*Borrar)</h1>
      {mostrarInformacion ? tratamiento() : tratamientos()}
    </div>
  );
};

export default Inicio;
