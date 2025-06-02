import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: 'auto' }}>
      <h2>Iniciar Sesión</h2>
      <div>
        <label>Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={{ marginTop: 15 }}>
        Entrar
      </button>
    </form>
  );
};

export default Login;
