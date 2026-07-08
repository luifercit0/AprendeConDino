import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [dinoElegido, setDinoElegido] = useState("dino_verde");
  const [jugadorId, setJugadorId] = useState(null);
  const [ultimoPuntaje, setUltimoPuntaje] = useState(0);
  const [certificadoObtenido, setCertificadoObtenido] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarUltimoJugador();
  }, []);

  const cargarUltimoJugador = async () => {
    const { data: jugador, error } = await supabase
      .from("jugadores")
      .select("*")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (jugador && !error) {
      setJugadorId(jugador.id);
      setNombre(jugador.nombre);
      setEdad(jugador.edad != null ? String(jugador.edad) : "");
      setDinoElegido(jugador.dino_elegido || "dino_verde");
      setCertificadoObtenido(!!jugador.certificado_obtenido);

      const { data: filasProgreso } = await supabase
        .from("progreso")
        .select("estrellas")
        .eq("jugador_id", jugador.id);

      const total = (filasProgreso || []).reduce((suma, fila) => suma + fila.estrellas, 0);
      setUltimoPuntaje(total);
    }

    setCargando(false);
  };

  const registrarJugador = async (nombreNuevo, edadNueva, dinoNuevo) => {
    if (jugadorId) {
      await supabase
        .from("jugadores")
        .update({
          nombre: nombreNuevo,
          edad: Number(edadNueva) || null,
          dino_elegido: dinoNuevo,
        })
        .eq("id", jugadorId);
    } else {
      const { data, error } = await supabase
        .from("jugadores")
        .insert({
          nombre: nombreNuevo,
          edad: Number(edadNueva) || null,
          dino_elegido: dinoNuevo,
        })
        .select()
        .single();

      if (!error && data) {
        setJugadorId(data.id);
      }
    }

    setNombre(nombreNuevo);
    setEdad(String(edadNueva));
    setDinoElegido(dinoNuevo);
  };

  const marcarCertificadoObtenido = async () => {
    if (!jugadorId) return;

    await supabase
      .from("jugadores")
      .update({ certificado_obtenido: true })
      .eq("id", jugadorId);

    setCertificadoObtenido(true);
  };

  return (
    <UserContext.Provider
      value={{
        nombre,
        setNombre,
        edad,
        setEdad,
        dinoElegido,
        setDinoElegido,
        jugadorId,
        ultimoPuntaje,
        certificadoObtenido,
        marcarCertificadoObtenido,
        cargando,
        registrarJugador,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
