import React, { useEffect } from 'react';
import { usersRequest } from '../redux/features/usersSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { User } from '../utils/types';

const Users = () => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(state => state.users)

  useEffect(() => {
    dispatch(usersRequest())
  }, [])

  return (
    <div className='user-list'>
      {data?.map((item: User) => {
        return (
          <div key={`user${item.id}`} className="user-item">
            <span>name: {item.name}</span>
            <span>email: {item.email}</span>
          </div>
        )
      })}
    </div>
  );
}

export default Users
