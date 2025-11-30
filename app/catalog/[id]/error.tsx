'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="wrapper">
      <h2>Помилка при завантаженні автомобіля</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()} className="btn btn-primary">
        Спробувати знову
      </button>
    </div>
  );
}
