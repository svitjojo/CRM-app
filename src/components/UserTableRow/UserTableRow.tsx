import { type FormEvent, useCallback, useState } from 'react';
import { type User } from '../../types/User';
import { Button, Form } from 'react-bootstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';

interface Props {
  user: User
}

export const UserTableRow: React.FC<Props> = ({ user }) => {
  const { role, full_name: fullName, id, sex } = user;

  const [newRole, setNewRole] = useState<string>(role);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const updateUserRole = async (id: string): Promise<void> => {
    try {
      const userDoc = doc(db, 'users', id);
      await updateDoc(userDoc, { role: newRole });
      toast.success('Role successfully updated', {
        hideProgressBar: true,
        theme: 'light',
        bodyClassName: 'toast-style',
        pauseOnHover: false,
        autoClose: 2000
      });
    } catch (error) {
      toast.error('Oops, something went wrong', {
        hideProgressBar: true,
        theme: 'light',
        bodyClassName: 'toast-style',
        pauseOnHover: false,
        autoClose: 2000
      });
    }
  };

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();

    updateUserRole(id);
    setIsButtonDisabled(true);
  }, [newRole, role]);

  const handleNewRole = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewRole(event.target.value);
    setIsButtonDisabled(false);
  }, []);

  return (
    <tr key={user.id}>
      <td>{id}</td>
      <td>{fullName}</td>
      <td>
        <Form onSubmit={handleSubmit} className='d-flex align-items-center'>
          <Form.Select
            className="mr-4"
            value={newRole}
            onChange={handleNewRole}
          >
            <option value="driver">driver</option>
            <option value="passenger">passenger</option>
            <option value="dispatcher">dispatcher</option>
          </Form.Select>
          <Button
            size='sm'
            type='submit'
            disabled={isButtonDisabled}
            style={{ cursor: !isButtonDisabled ? 'pointer' : 'default' }}
          >Save</Button>
        </Form>
      </td>
      <td>{sex}</td>
    </tr>
  );
};
