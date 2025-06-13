import styles from './SearchBar.module.css';
import { useRef } from 'react';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (searchQuery: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSearch = (formData: FormData) => {
    const query = formData.get('query')?.toString().trim();

    if (!query) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(query);
    formRef.current?.reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href='https://www.themoviedb.org/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by TMDB
        </a>

        <form className={styles.form} action={handleSearch} ref={formRef}>
          <label htmlFor='search' className={styles.visuallyHidden}>
            Search movies
          </label>
          <input
            className={styles.input}
            id='search'
            type='text'
            name='query'
            autoComplete='off'
            placeholder='Search movies...'
            autoFocus
          />
          <button
            className={styles.button}
            type='submit'
            aria-label='Search movies'
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
