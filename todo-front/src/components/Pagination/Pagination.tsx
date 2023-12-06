
import styles from './Pagination.module.css';

export interface PaginationProps {
    currentPage: number,
    totalPage: number,
    selectPageHandler: (page: number) => void;
}

const Pagination = ({ currentPage, totalPage, selectPageHandler }: PaginationProps) => {

    const pageNumbersArray = Array.from({ length: totalPage }, (_, i) => i + 1);
  
    return <div className={styles.container}>
        {pageNumbersArray.map((page) => (
            <button
              key={page}
              onClick={() => selectPageHandler(page)}
              className={`${page === currentPage ? styles.active : ''} ${styles.page_button}`}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ))}
    </div>;
}

export { Pagination }