import React, { createContext, useEffect, useState, useContext } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../services/firebaseConnection";

import { AuthContext } from "./auth";

export const HomeContext = createContext({});

function HomeProvider({ children }) {
  const { user, concursoSelected } = useContext(AuthContext);

  const [loadingSteps, setLoadingSteps] = useState(true);
  const db = getDatabase(app);
  const [timelineSteps, setTimelineSteps] = useState([]);
  const timelineRef = ref(
    db,
    "concursos/" + user.uid + "/" + concursoSelected + "/cronograma"
  );

  useEffect(() => {
    async function loadList() {
      onValue(timelineRef, (snapshot) => {
        setTimelineSteps([]);
        snapshot.forEach((childItem) => {
          let timeItem = {
            key: childItem.key,
            etapa: childItem.val().etapa,
            initialDate: childItem.val().initialDate,
            finalDate: childItem.val().finalDate,
          };
          setTimelineSteps((oldArray) => [...oldArray, timeItem]);
        });
        setLoadingSteps(false);
      });
    }
    loadList();
  }, [concursoSelected]);

  return (
    <HomeContext.Provider
      value={{
        timelineSteps,
        loadingSteps,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export default HomeProvider;
