import React, { createContext, useContext } from "react";

const EditModeCtx = createContext({ editMode: false, setEditMode: () => {} });

export function EditModeProvider({ children }) {
  const [editMode, setEditMode] = React.useState(() => {
    try { return localStorage.getItem("b44_edit_mode") === "1"; } catch { return false; }
  });
  React.useEffect(() => {
    try { localStorage.setItem("b44_edit_mode", editMode ? "1" : "0"); } catch {}
  }, [editMode]);
  return (
    <EditModeCtx.Provider value={{ editMode, setEditMode }}>
      {children}
    </EditModeCtx.Provider>
  );
}

export function useEditMode() { return useContext(EditModeCtx); }
