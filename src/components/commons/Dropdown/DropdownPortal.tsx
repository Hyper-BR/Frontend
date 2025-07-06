import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  top: number;
  left: number;
}

const DropdownPortal = ({ children, top, left }: Props) => {
  return createPortal(
    <div style={{ position: 'absolute', top, left, zIndex: 999 }}>
      {children}
    </div>,
    document.body,
  );
};

export default DropdownPortal;
