
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultView = 'login' 
}) => {
  const [view, setView] = useState<'login' | 'register'>(defaultView);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-md">
        {view === 'login' ? (
          <LoginForm 
            onSuccess={handleSuccess} 
            onRegisterClick={() => setView('register')} 
          />
        ) : (
          <RegisterForm 
            onSuccess={handleSuccess} 
            onLoginClick={() => setView('login')} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
