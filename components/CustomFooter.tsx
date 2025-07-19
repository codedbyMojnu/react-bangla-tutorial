import styles from './CustomFooter.module.css';

const CustomFooter = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} React JS Bangla Tutorial.</p>
    </footer>
  );
};

export default CustomFooter;
