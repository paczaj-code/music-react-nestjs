import { IconMoon, IconSunHigh } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useDarkMode } from 'usehooks-ts';

const ThemeSwitch = () => {
  const { isDarkMode, toggle } = useDarkMode();

  useEffect(() => {
    isDarkMode
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
  }, [isDarkMode]);

  return (
    <div className="theme_toggler">
      <IconSunHigh />
      <input type="checkbox" id="s3" onChange={toggle} checked={isDarkMode} />
      <IconMoon />
    </div>
  );
};
export default ThemeSwitch;
