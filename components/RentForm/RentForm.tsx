'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  carId: string;
  carTitle: string;
};

export default function RentForm({ carId, carTitle }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Booking request:', {
      carId,
      carTitle,
      name,
      email,
      dateFrom,
      dateTo,
    });

    await new Promise(res => setTimeout(res, 800));

    setLoading(false);

    toast.success(`Автомобіль "${carTitle}" успішно заброньовано!`);

    setName('');
    setEmail('');
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div>
      <Toaster />
      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <input
          required
          placeholder="Ім'я"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          required
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label>
          From
          <input
            type="date"
            required
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
          />
        </label>

        <label>
          To
          <input
            type="date"
            required
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
          />
        </label>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Rent now'}
        </button>
      </form>
    </div>
  );
}
