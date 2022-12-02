import { ReactNode, useState } from 'react';

export default function LoadingButton({
  onClick,
  children,
}: {
  onClick: () => Promise<void>;
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <button
      className={loading ? 'disabled-button' : 'primary-button'}
      onClick={async () => {
        setLoading(true);
        try {
          await onClick();
        } finally {
          setLoading(false);
        }
      }}
      disabled={loading}
    >
      {children}
    </button>
  );
}
