import { type FormEvent, useCallback, useState } from 'react';
import { type UserData } from '../../pages/EditingUser';
import { Button, Form } from 'react-bootstrap';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';

interface Props {
  user: UserData
}

export const UserTableRow: React.FC<Props> = ({ user }) => {
  const { role, full_name: fullName, photo_url: photo, id } = user;
  const [newRole, setNewRole] = useState<string>(role);

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

    if (role !== newRole) {
      updateUserRole(id);
    }
  }, [newRole, role]);

  const handleNewRole = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewRole(event.target.value);
  }, []);

  return (
    <tr key={user.id}>
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
            disabled={role === newRole}
            style={{ cursor: role !== newRole ? 'pointer' : 'default' }}
          >Save</Button>
        </Form>
      </td>
      <td>{photo}</td>
      <td>{photo}</td>
    </tr>
  );
};
