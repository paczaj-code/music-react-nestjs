const Section = ({
  title,
  titleIcon,
  className,
  children,
}: {
  title?: string;
  className?: string;
  titleIcon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <section className={className}>
      <h2 className="section_title">
        {titleIcon && titleIcon}
        {title}
      </h2>
      <div className="section_content">{children}</div>
    </section>
  );
};

export default Section;
