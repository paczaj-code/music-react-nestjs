import { useContext, useRef } from 'react';
import { AppContext } from '../../context/AppContext';
import { IconCircleLetterX } from '@tabler/icons-react';

const SearchInput = () => {
  const { setArtistFilter, artistFilter } = useContext(AppContext);

  const inputValueHandler = (value: string | undefined) => {
    setArtistFilter(value);
  };

  const handleClearfilter = () => {
    ref.current!.value = '';
    setArtistFilter(undefined);
  };

  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="artist_search_wrapper">
      <input
        ref={ref}
        onInput={() => inputValueHandler(ref.current?.value)}
        type="text"
        placeholder="szukaj"
        className="artist_search"
      />
      {artistFilter && artistFilter.length > 1 && (
        <IconCircleLetterX
          className="artist_search_clear"
          size={20}
          onClick={handleClearfilter}
        />
      )}
    </div>
  );
};

export default SearchInput;
