import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onRequestConfirm: (card: string, expiry: string) => void;
}

function getCardType(card: string) {
  if (/^4/.test(card)) return 'visa';
  if (/^5[1-5]/.test(card)) return 'mastercard';
  return '';
}

const PaymentModal = ({ isOpen, onClose, amount, onRequestConfirm }: PaymentModalProps) => {
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Simple validation
    if (!/^\d{16}$/.test(card)) {
      setError('Card number must be 16 digits');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError('Expiry must be MM/YY');
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setError('CVV must be 3 or 4 digits');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRequestConfirm(card, expiry);
    }, 800);
  };

  const cardType = getCardType(card);
  const masked = card ? card.replace(/.(?=.{4})/g, '*') : '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Test Payment</h2>
        <form onSubmit={handlePay} className="space-y-4">
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Card Number" value={card} onChange={e => setCard(e.target.value.replace(/\D/g, ''))} className="w-full border p-2 rounded" required maxLength={16} />
            {cardType === 'visa' && <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />}
            {cardType === 'mastercard' && <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />}
          </div>
          <div className="text-xs text-gray-500">Card Preview: {masked}</div>
          <div className="flex gap-2">
            <input type="text" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} className="w-1/2 border p-2 rounded" required maxLength={5} />
            <input type="text" placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, ''))} className="w-1/2 border p-2 rounded" required maxLength={4} />
          </div>
          <div className="font-semibold">Amount: ${amount}</div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-red-500 text-white rounded">{loading ? 'Processing...' : 'Pay'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal; 