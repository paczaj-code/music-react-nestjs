import { AnimatePresence, motion } from 'framer-motion';
import ArtistListItem from './ArtistListItem';
import { IconAlertTriangleFilled } from '@tabler/icons-react';

interface ArtistListTypes {
  id: number;
  name: string;
}
export const ArtistList = ({
  artislList,
}: {
  artislList: ArtistListTypes[] | undefined;
}) => {
  return (
    <AnimatePresence>
      {artislList && (
        <motion.ul
          role="list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
          className="artist-list"
        >
          {!artislList.length ? (
            <motion.div
              initial={{ opacity: 0.3, y: -10, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.2,
                type: 'tween',
              }}
              className="artist_list_empty artist_list_empty_show"
            >
              <IconAlertTriangleFilled size={40} />
              <h6>Brak wyników</h6>
            </motion.div>
          ) : (
            artislList.map((artist) => (
              <ArtistListItem
                id={artist.id}
                name={artist.name}
                key={artist.id}
              />
            ))
          )}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
