import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { UserContext } from "./UserContext";

export const ScoreContext = createContext();

const ACTIVIDADES = ["Letras", "Numeros", "Colores", "DinoGame"];

export const ScoreProvider = ({ children }) => {
  const { jugadorId, ultimoPuntaje, cargando } = useContext(UserContext);

  const [stars, setStars] = useState(0);
  const [completadas, setCompletadas] = useState([]);

  useEffect(() => {
    if (!cargando) {
      setStars(ultimoPuntaje);
    }
  }, [cargando, ultimoPuntaje]);

  useEffect(() => {
    if (jugadorId) {
      cargarCompletadas();
    }
  }, [jugadorId]);

  const cargarCompletadas = async () => {
    const { data } = await supabase
      .from("progreso")
      .select("actividad")
      .eq("jugador_id", jugadorId)
      .eq("completado", true);

    setCompletadas((data || []).map((fila) => fila.actividad));
  };

  const guardarProgreso = async (actividad, estrellasGanadas, completado) => {
    if (!jugadorId) return;

    const { data: filaExistente } = await supabase
      .from("progreso")
      .select("*")
      .eq("jugador_id", jugadorId)
      .eq("actividad", actividad)
      .maybeSingle();

    const estrellasNuevas = (filaExistente?.estrellas || 0) + estrellasGanadas;
    const completadoNuevo = filaExistente?.completado || completado;

    await supabase.from("progreso").upsert(
      {
        jugador_id: jugadorId,
        actividad,
        estrellas: estrellasNuevas,
        completado: completadoNuevo,
        actualizado_en: new Date().toISOString(),
      },
      { onConflict: "jugador_id,actividad" }
    );
  };

  const addStar = (actividad = "General") => {
    setStars((prev) => prev + 1);
    guardarProgreso(actividad, 1, false);
  };

  const addFiveStars = (actividad = "General") => {
    setStars((prev) => prev + 5);
    guardarProgreso(actividad, 5, false);
  };

  const resetStars = () => {
    setStars(0);
  };

  const marcarCompletada = (actividad) => {
    setCompletadas((prev) => (prev.includes(actividad) ? prev : [...prev, actividad]));
    guardarProgreso(actividad, 0, true);
  };

  const todoCompletado = ACTIVIDADES.every((a) => completadas.includes(a));

  return (
    <ScoreContext.Provider
      value={{
        stars,
        addStar,
        addFiveStars,
        resetStars,
        completadas,
        marcarCompletada,
        todoCompletado,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
