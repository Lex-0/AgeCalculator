import { useEffect, useState } from "react";
import "../formulario.css";
import meses from "./Date.js";

export function Formulario() {
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [año, setAño] = useState("");
  const [edadAños, setEdadAños] = useState("--");
  const [edadMeses, setEdadMeses] = useState("--");
  const [edadDias, setEdadDias] = useState("--");
  const [ErrorA, setErrorA] = useState(false);
  const [ErrorB, setErrorB] = useState(false);
  const [ErrorC, setErrorC] = useState(false);

  useEffect(() => {}, []);

  const validarFecha = () => {
    let isValid = true;

    if (dia === "") {
      setErrorA("This field is required", true);
      isValid = false;
    } else if (dia > 31) {
      setErrorA("Must be a valid day", true);
      isValid = false;
    } else if (isNaN(dia)) {
      setErrorA("the date is not valid", true);
      isValid = false;
    }

    if (mes === "") {
      setErrorB("This field is required", true);
      isValid = false;
    } else if (mes > 12) {
      setErrorB("Must be a valid month", true);
      isValid = false;
    } else if (
      (mes === 2 || dia > meses.febrero.dias) &&
      (mes === 4 || dia > meses.abril.dias) &&
      (mes === 6 || dia > meses.junio.dias) &&
      (mes === 9 || dia > meses.septiembre.dias) &&
      (mes === 11 || dia > meses.noviembre.dias)
    ) {
      setErrorA("Must be a valid day", true);
      setErrorB("Must be a valid month", true);
      isValid = false;
    } else if (isNaN(mes)) {
      setErrorB("The date is not valid", true);
      isValid = false;
    }

    const fechaNacimiento = new Date(
      parseInt(año),
      parseInt(mes) - 1,
      parseInt(dia)
    );

    if (año === "") {
      setErrorC("This field is required", true);
      isValid = false;
    } else if (isNaN(año)) {
      setErrorC("the date is not valid", true);
      isValid = false;
    } else if (año > 2023) {
      setErrorC("the date is not valid", true);
      isValid = false;
    }

    const fechaActual = new Date();

    if (fechaNacimiento > fechaActual) {
      setErrorC("Must be in the past", true);
      isValid = false;
    }
    return isValid;
  };

  const calcularEdad = () => {
    if (!validarFecha()) {
      return;
    }

    const fechaActual = new Date();
    const fechaNacimiento = new Date(
      parseInt(año),
      parseInt(mes) - 1,
      parseInt(dia)
    );

    let edadAñosCalculada =
      fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    let edadMesesCalculada =
      fechaActual.getMonth() - fechaNacimiento.getMonth();
    let edadDiasCalculada = fechaActual.getDate() - fechaNacimiento.getDate();

    if (edadDiasCalculada < 0) {
      edadMesesCalculada--;
      const ultimoDiaMesAnterior = new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth(),
        0
      ).getDate();
      edadDiasCalculada =
        ultimoDiaMesAnterior -
        fechaNacimiento.getDate() +
        fechaActual.getDate();
    }

    if (edadMesesCalculada < 0) {
      edadAñosCalculada--;
      edadMesesCalculada += 12;
    }

    setEdadAños(edadAñosCalculada);
    setEdadMeses(edadMesesCalculada);
    setEdadDias(edadDiasCalculada);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calcularEdad();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="content-fecha">
          <div className="section">
            <h2>Dia</h2>
            <input
              className={ErrorA && !dia ? "input-inv" : ""}
              placeholder="DD"
              maxLength={2}
              id="inputDia"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
            />
            {ErrorA && <h3>{ErrorA}</h3>}
          </div>

          <div className="section">
            <h2>Mes</h2>
            <input
              className={ErrorB && !mes ? "input-inv" : ""}
              placeholder="MM"
              maxLength={2}
              id="inputMes"
              value={mes}
              onChange={(e) => setMes(e.target.value)}
            />
            {ErrorB && <h3>{ErrorB}</h3>}
          </div>
          <div className="section">
            <h2>Año</h2>
            <input
              className={ErrorC && !año ? "input-inv" : ""}
              placeholder="YYYY"
              maxLength={4}
              id="inputAño"
              value={año}
              onChange={(e) => setAño(e.target.value)}
            />
            {ErrorC && <h3>{ErrorC}</h3>}
          </div>
        </div>
        <div className="line-btn">
          <hr className="hr1"></hr>
          <button className="btn" onClick={calcularEdad}>
            <img src="Arrow.svg" className="icon" alt="text" />
          </button>
          <hr className="hr2"></hr>
        </div>
        <div className="result">
          <p>
            <label>{edadAños}</label> años
          </p>
          <p>
            <label>{edadMeses}</label> meses
          </p>
          <p>
            <label>{edadDias}</label> dias
          </p>
        </div>
      </form>
      <footer className="attribution">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://www.frontendmentor.io/profile/Lex-0"
          target="_black"
          rel="noreferrer"
        >
          Lex-0
        </a>
        .
      </footer>
    </div>
  );
}
