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

type UserRoles = 'USER' | 'CREATOR' | 'ADMIN' | 'GUEST';
interface User {
  id: string;
  role: UserRoles;
}
