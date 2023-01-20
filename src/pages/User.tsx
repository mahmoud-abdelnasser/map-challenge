import * as React from 'react';
import { useParams } from 'react-router-dom';

export interface IUserProps {
}

export default function User (props: IUserProps) {
  const { id } = useParams()
  
  return (
    <div>
      <span>`user {id}`</span>
    </div>
  );
}
