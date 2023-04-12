import {
  memo,
  useCallback,
  useEffect,
  useState
} from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { type City } from '../../types/City';
import { citiesData } from '../../api/citiesApi';

interface Props {
  placeholder: string
  handleInput: (value: string) => void
  query: string
  label: string
}

export const FormWithDropdown: React.FC<Props> = memo(({ placeholder, handleInput, query, label }) => {
  const [results, setResults] = useState<City[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const data = await citiesData(query);

        setResults(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [query]);

  const handleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;

    handleInput(value);
    if (value.trim()) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, []);

  const handleDropdownItemClick = useCallback((item: string): void => {
    handleInput(item);
    setResults([]);
    setShowDropdown(false);
  }, []);

  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        className="form-control rounded"
        placeholder={placeholder}
        value={query}
        onChange={handleQueryChange}
      />
      <Dropdown show={showDropdown} className="position-absolute w-100">
        <Dropdown.Menu>
          {results.map((item) => (
            <Dropdown.Item key={item.objectId} onClick={() => { handleDropdownItemClick(item.name); }}>
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
});

FormWithDropdown.displayName = 'FormWithDropdown';
