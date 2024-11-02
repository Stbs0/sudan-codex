type Props = { children: React.ReactNode };

const MainContent = ({ children }: Props) => {
  //  const {isMobile}=useWidth();
  return <main className=' grid p-8 '>{children}</main>;
};

export default MainContent;
