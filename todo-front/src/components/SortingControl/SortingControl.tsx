
import { SortingField, SortingOrder } from 'dtos/FetchTaskList.dto';
import styles from './SortingControl.module.css';

export interface SortingControlProps {
    sortingField?: SortingField,
    sortingOrder: SortingOrder,
    setSortingParams: ( sortingOrder: SortingOrder, sortingField?: SortingField) => void;
}

const SortingControl = ({ sortingField, sortingOrder, setSortingParams }: SortingControlProps) => {
    const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedField = event.target.value;
        setSortingParams(sortingOrder, selectedField === 'default' ? undefined : selectedField  as SortingField);
      };
    
      const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOrder = event.target.value as SortingOrder;
        setSortingParams( selectedOrder, sortingField);
      };
      const selectPlaceholder = '- select -';
      return (
        <div className={styles.container}>
          <label>
            Sorting by:
            <select value={sortingField || selectPlaceholder} onChange={handleFieldChange}>
              <option disabled>{selectPlaceholder}</option>
              <option value="username">username</option>
              <option value="email">email</option>
              <option value="isDone">status</option>
            </select>
          </label>
    
          <label>
            Sorting order:
            <select disabled={!sortingField} value={(sortingField &&sortingOrder) || selectPlaceholder} onChange={handleOrderChange}>
              <option disabled>{selectPlaceholder}</option>
              <option value="asc">ascending</option>
              <option value="desc">descending</option>
            </select>
          </label>
        </div>
      );
}

export { SortingControl }