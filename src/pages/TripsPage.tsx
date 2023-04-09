import { useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

interface Items {
  id: number
  name: string
  category: string
}

export const TripsPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Items[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const items = [
    { id: 1, name: 'Item 1', category: 'Category A' },
    { id: 2, name: 'Item 2', category: 'Category A' },
    { id: 3, name: 'Item 3', category: 'Category B' },
    { id: 4, name: 'Item 4', category: 'Category B' },
    { id: 5, name: 'Item 5', category: 'Category C' },
    { id: 6, name: 'Item 6', category: 'Category C' }
  ];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setQuery(value);
    if (value) {
      const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredItems);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  const handleDropdownItemClick = (item: string): void => {
    setQuery(item);
    setResults([]);
    setShowDropdown(false);
  };
  console.log(showDropdown);

  return (
    <>
      <Form className="position-relative d-flex">
        <Form.Group>
          <Form.Control
            type="text"
            className="form-control"
            placeholder="From..."
            value={query}
            onChange={handleQueryChange}
          />
          <Dropdown className="position-absolute w-100">
            <Dropdown.Menu show={showDropdown}>
              {results.map((item) => (
                <Dropdown.Item key={item.id} onClick={() => { handleDropdownItemClick(item.name); }}>
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            className="form-control"
            placeholder="To..."
            // value={query}
            // onChange={handleQueryChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Date..."
            // value={query}
            // onChange={handleQueryChange}
          />
        </Form.Group>
      </Form>
      {/* <div className="position-relative">
      </div> */}
    </>
  );
};
