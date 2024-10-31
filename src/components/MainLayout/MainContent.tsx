type Props = { children: React.ReactNode };

const MainContent = ({ children }: Props) => {
  //  const {isMobile}=useWidth();
  return <main className=' grid py-8 '>{children}</main>;
};

export default MainContent;
