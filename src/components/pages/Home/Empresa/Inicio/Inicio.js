import React, { useState, useEffect } from "react";
import fileDownload from "js-file-download";

import {
  inicioEmpresa,
  globales,
} from "../../../../../constants/nombresConstantes";

import Form from "react-bootstrap/Form";
import Select from "react-select";
import Dropdown from "react-bootstrap/Dropdown";

import empresaTratamientosService from "../../../../../services/empresaTratamientos";

import empresaCorreoService from "../../../../../services/empresaCorreos";

import Tratamiento from "./Tratamiento";
import TratamientoInformacion from "./TratamientoInformacion";
import Bloque from "./Bloque";

const Inicio = () => {
  const [data, setData] = useState([]);

  const [mostrarInformacion, setMostrarInformacion] = useState("inicio");

  const [dataTratamiento, setDataTratamiento] = useState({});

  const [tratamientoSolicitado, setTratamientoSolicitado] = useState({});

  const [fechaFin, setFechaFin] = useState("");

  const [filter, setFilter] = useState(inicioEmpresa.lblFiltroOpcion1);

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

  //modos exportar
  //1 -> exportar todos
  //2 -> exportar por persona
  //3 -> exportar por tratamiento

  const [modoExportar, setModoExportar] = useState(1);

  const [filtrotexto, setFiltroTexto] = useState(
    `${inicioEmpresa.lblFiltroSeleccionado} Por Persona - Todos`
  );

  const [bloques, setBloques] = useState([]);

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

  const formatearFechaHtml = (fecha) => {
    const fechaArray = fecha.split("/");
    const fechaFormateada = new Date(
      fechaArray[2],
      fechaArray[1] - 1,
      fechaArray[0]
    );
    return fechaFormateada.toISOString().split("T")[0];
  };

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
      setMostrarInformacion("tratamiento");

      console.log("tratamiento", tratamiento);
      const fechaFormateada = formatearFechaHtml(tratamiento.fecha_fin);

      setFechaFin(fechaFormateada);
    });
  };

  const handleVerBloques = (id) => {
    console.log(`handle ver bloques empresa id: ${id}`);
    empresaTratamientosService.getBlockChain(id).then((bloques) => {
      console.log("bloques recuperados: ", bloques);
      setBloques(bloques);
      setMostrarInformacion("bloques");
    });
  };

  const handleFilter = (valor) => {
    console.log("e.target.value: ", valor);
    setFilter(valor);

    if (valor === inicioEmpresa.lblFiltroOpcion1) {
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
    if (filter === inicioEmpresa.lblFiltroOpcion1) {
      console.log("boton filtrar por persona");
      if (filtroSeleccionado === "Todos") {
        setFiltroTexto(
          `${inicioEmpresa.lblFiltroSeleccionado} Por Persona - Todos`
        );
        setModoExportar(1);
        console.log("entro todos");
        empresaTratamientosService.getAll().then((tratamientos) => {
          setData(tratamientos);
          console.log("tratamientos recuperados: ", tratamientos);
        });
      } else {
        setModoExportar(2);
        console.log("filtroSeleccionado: ", filtroSeleccionado);
        handleVerDatos(filtroSeleccionado);
      }
    } else {
      const labelTratamiento = opcionesFiltroTratamiento.find(
        (tratamiento) => tratamiento.value === filtroSeleccionado
      ).label;

      setFiltroTexto(
        `${inicioEmpresa.lblFiltroSeleccionado} Por Tartamiento - ${labelTratamiento}` /////////////////////
      );
      setModoExportar(3);
      console.log("boton filtrar por Tratamiento");
      //TODO: filtrar por tratamiento
      //mostar usuarios que tienen ese tratamiento
      //console.log("filtroSeleccionado: ", filtroSeleccionado);
      //console.log("opcionesFiltroTratamiento: ", opcionesFiltroTratamiento);

      console.log("labelTratamiento: ", labelTratamiento);
      empresaTratamientosService
        .getUsersByTreatment(labelTratamiento)
        .then((tratamientos) => {
          console.log("tratamientos recuperados: ", tratamientos);
          setData(tratamientos);
        });
    }
  };

  const handleExportar = (tipo) => {
    //comprobar informacion

    switch (modoExportar) {
      case 1:
        console.log("exportar todos los datos");
        //download file
        empresaTratamientosService.exportAllEnterprise(tipo).then((data) => {
          fileDownload(data, `TratamietosUsuariosTodos.${tipo}`);
        });
        break;
      case 2:
        console.log("exportar datos de un usuario");
        break;
      case 3:
        console.log("exportar datos de un tratamiento");

        const labelTratamiento = opcionesFiltroTratamiento.find(
          (tratamiento) => tratamiento.value === filtroSeleccionado
        ).label;

        console.log("filtroSeleccionado: ", labelTratamiento);
        console.log("exportar datos de un tratamiento 2");
        empresaTratamientosService
          .exportUsersByTreatment(labelTratamiento)
          .then((data) => {
            tipo = "xlsx";
            fileDownload(data, `Tratamietos_${labelTratamiento}.${tipo}`);
          });

        break;
      default:
        console.log("switch case default");
      // empresaTratamientosService.exportAllEnterprise(tipo).then((data) => {
      //   fileDownload(data, `TratamietosUsuariosTodos.${tipo}`);
      // });
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
                setMostrarInformacion("inicio");
              }}
            >
              {globales.btnRegresar}
            </button>
            <button className="m-2 btn btn-primary" onClick={() => {}}>
              {globales.btnExportar}
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
                  <input type="date" value={fechaFin} disabled={true}></input>
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

  const bloquesRender = () => {
    return (
      <div>
        <h1>Bloques:</h1>
        <button
          className="m-2 btn btn-secondary"
          onClick={() => {
            setMostrarInformacion("inicio");
          }}
        >
          Atras
        </button>
        <div>
          {bloques.map((bloque) => {
            return <Bloque key={bloque._id} item={bloque}></Bloque>;
          })}
        </div>
      </div>
    );
  };

  const tratamientos = () => {
    return (
      <div>
        <div>
          <h1>{inicioEmpresa.lblFiltro}: </h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Check
              value={inicioEmpresa.lblFiltroOpcion1}
              type="radio"
              label={inicioEmpresa.lblFiltroOpcion1}
              onChange={(e) => handleFilter(e.target.value)}
              checked={filter === inicioEmpresa.lblFiltroOpcion1 ? true : false}
            />
            <Form.Check
              value={inicioEmpresa.lblFiltroOpcion2}
              type="radio"
              label={inicioEmpresa.lblFiltroOpcion2}
              onChange={(e) => handleFilter(e.target.value)}
              checked={filter === inicioEmpresa.lblFiltroOpcion2 ? true : false}
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
            {inicioEmpresa.btnFiltro}
          </button>
        </div>
        <h1>{inicioEmpresa.lblTratamientos}</h1>
        <h5>{filtrotexto}</h5>
        <Dropdown
          onSelect={(e) => {
            handleExportar(e);
          }}
        >
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            {inicioEmpresa.btnExportar}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="csv">.csv</Dropdown.Item>
            <Dropdown.Item eventKey="xlsx">.xlsx</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="d-flex justify-content-around"></div>
        {data.length > 0 ? (
          data.map((tratamiento) => (
            <Tratamiento
              key={tratamiento.id_consent}
              item={tratamiento}
              handleVerDatos={handleVerDatos}
              handleVerBloques={handleVerBloques}
            />
          ))
        ) : (
          <div className="alert alert-warning" role="alert">
            {inicioEmpresa.lblMensajeNoExistenCoincidencias}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {mostrarInformacion === "inicio" ? tratamientos() : null}
      {mostrarInformacion === "tratamiento" ? tratamiento() : null}
      {mostrarInformacion === "bloques" ? bloquesRender() : null}
    </div>
  );
};

export default Inicio;
