interface IImage extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspect_ratio: 'square' | 'wide';
  alt: string;
}

const Image: React.FC<IImage> = ({
  alt,
  width,
  aspect_ratio,
  src,
  className,
}) => {
  return (
    <div className="image_wrapper ">
      <img
        className={className}
        src={src}
        alt={alt}
        width={width}
        style={{ aspectRatio: aspect_ratio === 'square' ? '1/1' : '16/9' }}
      />
    </div>
  );
};

export default Image;
