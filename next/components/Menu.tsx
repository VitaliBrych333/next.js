import { MouseEventHandler } from 'react';
import styles from './Menu.module.css';

const Menu = (props: { handleClose: MouseEventHandler, children: JSX.Element[] }) => {
  const { handleClose, children } = props;
  
  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={handleClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {children}
      </section>
    </div>
  );
}

export default Menu;