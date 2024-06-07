import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';

function getHighlightedText(text: string, higlight: string) {
  // Split text on higlight term, include term itself into parts, ignore case
  const parts = text.split(new RegExp(`(${higlight})`, 'gi'));
  let markedText;
  if (higlight && higlight.length >= 2) {
    markedText = parts.map((part, index) => (
      <React.Fragment key={index}>
        {part.toLowerCase() === higlight.toLowerCase() ? (
          <mark className="mark">{part}</mark>
        ) : (
          part
        )}
      </React.Fragment>
    ));
  } else {
    markedText = text;
  }

  return markedText;
}

const ArtistListItem = ({ id, name }: { id: number; name: string }) => {
  const { artistFilter, setIsSidebarVisible, isMobile } =
    useContext(AppContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // const isMobile = false;
  function handleClick() {
    isMobile &&
      id !== +pathname.split('/').pop()! &&
      setIsSidebarVisible(false);
    navigate(`/artist/${id}`);
  }

  return (
    <li
      className={`artist-list-item ${
        +pathname.split('/').pop()! === id ? 'active' : ''
      }`}
      key={id}
      onClick={handleClick}
    >
      {artistFilter ? getHighlightedText(name, artistFilter) : name}
    </li>
  );
};

export default ArtistListItem;
