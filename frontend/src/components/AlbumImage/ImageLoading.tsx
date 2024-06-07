import { IconPhotoUp } from '@tabler/icons-react';

const ImageLoading = ({ isImageLoaded }: { isImageLoaded: boolean }) => {
  return (
    <div className="image_loading">
      <IconPhotoUp
        size={94}
        stroke={1}
        className={`${isImageLoaded ? 'loaded' : ''}`}
      />
      <p>Loading</p>
    </div>
  );
};

export default ImageLoading;
