
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
      const selectPlaceholder = '- выбрать -';
      return (
        <div className={styles.container}>
          <label>
            Сортировка по:
            <select value={sortingField || selectPlaceholder} onChange={handleFieldChange}>
              <option disabled>{selectPlaceholder}</option>
              <option value="username">имя пользователя</option>
              <option value="email">email</option>
              <option value="isDone">статус</option>
            </select>
          </label>
    
          <label>
            Порядок сортировки:
            <select disabled={!sortingField} value={(sortingField &&sortingOrder) || selectPlaceholder} onChange={handleOrderChange}>
              <option disabled>{selectPlaceholder}</option>
              <option value="asc">по возрастанию</option>
              <option value="desc">по убыванию</option>
            </select>
          </label>
        </div>
      );
}

export { SortingControl }