import React, { createContext, useContext, useState, useEffect } from "react";

const RecordsContext = createContext();

export const RecordsProvider =({ children})=>{
    const [recordsList, setRecordsList] = useState([]);

    // Загрузка анализов из localStorage при старте
    useEffect(() => {
      const saved = localStorage.getItem("recordsList");

      if (saved) {
        setRecordsList(JSON.parse(saved)); 
      }
    }, []);

    // Запись анализов в localStorage при каждом их изменении
    useEffect(() => {
      localStorage.setItem("recordsList", JSON.stringify(recordsList)); 
    }, [recordsList]);

    return (
      <RecordsContext.Provider value={{ recordsList, setRecordsList }}>
        {children}
      </RecordsContext.Provider>
    )
}

export const useRecords =()=>useContext(RecordsContext);
