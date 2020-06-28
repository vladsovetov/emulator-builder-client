import { createContext } from 'react';

export default createContext({
  addCell: (cell: CellInterface) => {},
  removeCell: (cell: CellInterface) => {},
});
