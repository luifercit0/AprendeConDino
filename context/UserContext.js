import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../services/supabaseClient";

export const UserContext = createContext();

const CLAVE_JUGADOR_LOCAL = "@dino_jugador_id";

export const UserProvider = ({ children }) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [dinoElegido, setDinoElegido] = useState("dino_verde");
  const [jugadorId, setJugadorId] = useState(null);
  const [ultimoPuntaje, setUltimoPuntaje] = useState(0);
  const [certificadoObtenido, setCertificadoObtenido] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarJugadorDeEsteDispositivo();
  }, []);

  const aplicarDatosDeJugador = async (jugador) => {
    setJugadorId(jugador.id);
    setNombre(jugador.nombre);
    setEdad(jugador.edad != null ? String(jugador.edad) : "");
    setDinoElegido(jugador.dino_elegido || "dino_verde");
    setCertificadoObtenido(!!jugador.certificado_obtenido);

    await AsyncStorage.setItem(CLAVE_JUGADOR_LOCAL, String(jugador.id));

    const { data: filasProgreso } = await supabase
      .from("progreso")
      .select("estrellas")
      .eq("jugador_id", jugador.id);

    const total = (filasProgreso || []).reduce((suma, fila) => suma + fila.estrellas, 0);
    setUltimoPuntaje(total);
  };

  const cargarJugadorDeEsteDispositivo = async () => {
    const idGuardadoLocal = await AsyncStorage.getItem(CLAVE_JUGADOR_LOCAL);

    if (!idGuardadoLocal) {
      setCargando(false);
      return;
    }

    const { data: jugador, error } = await supabase
      .from("jugadores")
      .select("*")
      .eq("id", idGuardadoLocal)
      .maybeSingle();

    if (jugador && !error) {
      await aplicarDatosDeJugador(jugador);
    } else {
      await AsyncStorage.removeItem(CLAVE_JUGADOR_LOCAL);
    }

    setCargando(false);
  };

  const registrarJugador = async (nombreNuevo, edadNueva, dinoNuevo) => {
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
      await aplicarDatosDeJugador(data);
    }
  };

  const iniciarSesion = async (nombreBuscado, edadBuscada, dinoBuscado) => {
    const { data: jugador, error } = await supabase
      .from("jugadores")
      .select("*")
      .ilike("nombre", nombreBuscado.trim())
      .eq("edad", Number(edadBuscada) || null)
      .eq("dino_elegido", dinoBuscado)
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!jugador || error) {
      return false;
    }

    await aplicarDatosDeJugador(jugador);
    return true;
  };

  const marcarCertificadoObtenido = async () => {
    if (!jugadorId) return;

    await supabase
      .from("jugadores")
      .update({ certificado_obtenido: true })
      .eq("id", jugadorId);

    setCertificadoObtenido(true);
  };

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem(CLAVE_JUGADOR_LOCAL);
    setJugadorId(null);
    setNombre("");
    setEdad("");
    setDinoElegido("dino_verde");
    setUltimoPuntaje(0);
    setCertificadoObtenido(false);
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
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};