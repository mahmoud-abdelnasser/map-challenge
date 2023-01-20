import * as React from 'react';

export interface INotFoundProps {
}

export default function NotFound (props: INotFoundProps) {
  
  return (
    <div className='not-found'>
      <span>
        This site can’t be reached Check if there is a typo in http:/localhost:3000/ 
      </span>
    </div>
  );
}
