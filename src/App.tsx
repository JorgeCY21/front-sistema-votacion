import React, { useState } from 'react';
import Login from '../components/Login';

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = (username: string, password: string) => {
    // Aquí pondremos la lógica real (llamada al backend)
    // Por ahora, ejemplo simple:
    if (username === 'admin' && password === '1234') {
      setIsLogged(true);
    } else {
      alert('Credenciales inválidas');
    }
  };

  if (!isLogged) {
    return <Login onLogin={handleLogin} />;
  }

  return <h1>¡Bienvenido al sistema de votación!</h1>;
};

export default App;
