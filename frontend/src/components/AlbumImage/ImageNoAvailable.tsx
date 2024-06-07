import { IconPhotoCancel } from '@tabler/icons-react';

const ImageNoAvailable = () => {
  return (
    <div className="image_no_available">
      <IconPhotoCancel size={94} stroke={1} />
      <p>Image no available</p>
    </div>
  );
};

export default ImageNoAvailable;
