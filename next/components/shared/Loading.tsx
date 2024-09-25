import styles from './Loading.module.css';

const Loading = (props: { customClass: string }) => {
  const { customClass } = props;

  return (
    <div className={customClass}>
      <p>Loading</p>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export { Loading };