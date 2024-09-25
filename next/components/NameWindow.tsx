import { MouseEventHandler, memo } from 'react';
import styles from './NameWindow.module.css';

const NameWindow = memo(function NameWindow(props: { namePage: string, handleClose: MouseEventHandler<HTMLDivElement>}) {
  const { namePage, handleClose } = props;
  
  return (
    <div className={styles.close}>
      <h2>{namePage}</h2>
      <div onClick={handleClose}>&times;</div>
    </div>
  );
});

export default NameWindow;