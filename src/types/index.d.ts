interface Panel {
  name: string;
  borderRadius: number;
  padding: number;
  height: number;
  width: number;
}

type PanelElementTypes = 'panel' | 'cell';

interface BasePanelElement {
  id: number;
  type: PanelElementTypes;
  height: number;
  width: number;
  top: number;
  left: number;
}

interface PanelCell extends BasePanelElement {
  type: 'cell';
}

type PanelElement = PanelCell;

interface User {
  name: string;
}

interface Error {
  message: string;
}
