const Modal = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFFFFF',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        width: '300px',
        height: '250px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          color: '#333',
          fontSize: '24px',
          fontWeight: 'bold',
          margin: 0,
        }}
      >
        환영합니다
      </p>
    </div>
  );
};

export default Modal;
