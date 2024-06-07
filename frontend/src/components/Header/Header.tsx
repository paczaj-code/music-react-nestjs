import { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import {
  IconBrandYoutubeFilled,
  IconHomeFilled,
  IconMenuDeep,
  IconX,
} from '@tabler/icons-react';
import SearchInput from './SearchInput';
import Button from '../Button/Button';
import { AppContext } from '../../context/AppContext';

const Header = () => {
  const { isSidebarVisible, setIsSidebarVisible, isMobile } =
    useContext(AppContext);

  return (
    <nav className="header">
      {isMobile ? (
        <Button
          className="menu_show_toggle button"
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          {isSidebarVisible ? <IconX size={22} /> : <IconMenuDeep size={22} />}
        </Button>
      ) : null}
      <SearchInput />
      <div className="header_links">
        <NavLink to="/" className="header_link">
          <IconHomeFilled size={24} stroke={2} />
          <span className="header_link_title">Homepage</span>
        </NavLink>
        <NavLink to="/youtube" className="header_link">
          <IconBrandYoutubeFilled size={24} stroke={1} />
          <span className="header_link_title">Youtube</span>
        </NavLink>
      </div>
      <ThemeSwitch />
    </nav>
  );
};

export default Header;
