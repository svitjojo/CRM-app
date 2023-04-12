import { type FormEvent, useEffect, useState, useCallback } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { FormWithDropdown } from '../components/FormWithDropdowm/FormWithDropdown';
import { type Trip } from '../types/Trip';
import { createTrip, getTrips } from '../api/tripsApi';
import { toast } from 'react-toastify';
import { SideBar } from '../components/SideBar';

export const TripsPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tripFrom, setTripFrom] = useState<string>('');
  const [tripTo, setTripTo] = useState<string>('');
  const [tripDate, setTripDate] = useState<string>('');
  const [tripPassengerCapacity, setTripPassengerCapacity] = useState<number>(0);

  const fetchTrips = useCallback(async (): Promise<void> => {
    try {
      const data = await getTrips();
      setTrips(data);
    } catch (error) {
      if (error instanceof Error) {
        throw Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, []);

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      await createTrip(tripFrom, tripTo, tripDate, tripPassengerCapacity);
      toast.success('Trip successfully added', {
        hideProgressBar: true,
        theme: 'light',
        bodyClassName: 'toast-style',
        pauseOnHover: false,
        autoClose: 3000
      });
      fetchTrips();
    } catch (error) {
      toast.error('Oops, something went wrong', {
        hideProgressBar: true,
        theme: 'light',
        bodyClassName: 'toast-style',
        pauseOnHover: false,
        autoClose: 3000
      });
    } finally {
      setTripDate('');
      setTripFrom('');
      setTripPassengerCapacity(0);
      setTripTo('');
    }
  }, [tripFrom, tripTo, tripDate, tripPassengerCapacity]);

  return (
    <SideBar>
      <h3 className='mt-4'>Current trips</h3>
      <Table bordered responsive className='mt-4'>
        <thead className='thead-dark'>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Passenger Capacity</th>
          </tr>
        </thead>
        <tbody>
          {!!trips && (
            trips.map(({ id, from, to, date, passenger_capacity: passengerCapacity }) => (
                <tr key={id}>
                  <td>{from}</td>
                  <td>{to}</td>
                  <td>{date}</td>
                  <td>{passengerCapacity}</td>
                </tr>
            ))
          )}
        </tbody>
      </Table>
      <h4 className="mt-4">Let&lsquo;s start a new trip :</h4>
      <Form onSubmit={onSubmit} className="mt-4">
        <Row>
          <Col>
            <Form.Group className='position-relative mb-3'>
              <FormWithDropdown
                handleInput={(value) => { setTripFrom(value); }}
                label={'Leaving from :'}
                placeholder='Leaving from...'
                query={tripFrom}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='position-relative mb-3'>
              <FormWithDropdown
                handleInput={(value) => { setTripTo(value); }}
                label={'Going to :'}
                placeholder='Going to...'
                query={tripTo}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Choose a date :</Form.Label>
              <Form.Control
                type="date"
                className="form-control"
                value={tripDate}
                onChange={(event) => { setTripDate(event.target.value); }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Capacity of passengers :</Form.Label>
              <Form.Control
                type="number"
                className="form-control"
                value={tripPassengerCapacity || ''}
                onChange={(event) => { setTripPassengerCapacity(+event.target.value); }}
                placeholder='For example: 1'
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type='submit' className='mt-4'>Add</Button>
      </Form>
    </SideBar>
  );
};
