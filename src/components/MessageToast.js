import {useSelector} from 'react-redux';

export default function Message() {

  const messages = useSelector((state) => state.message) || [];
  return (
    <>
      <div
        className='toast-container position-fixed'
        style={{ top: '64px', right: '15px' }}
      >
      {
        messages?.map((message) =>{
          return<>
          <div
            key={message.id}
            className='toast show'
            role='alert'
            aria-live='assertive'
            aria-atomic='true'
            data-delay='3000'
          >
            <div className={`toast-header text-white bg-${message.type}`}>
              <strong className='me-auto'>{message.title}</strong>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='toast'
                aria-label='Close'
              />
            </div>
            <div className='toast-body'>{message.content}</div>
          </div>             
          </>
        })
      }
      </div>
    </>
  );
}
