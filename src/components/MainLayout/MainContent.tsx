
type Props = { children: React.ReactNode };

const MainContent = ({ children }: Props) => {
//  const {isMobile}=useWidth();
  return <main className=' flex-1 p-4 flex items-center'>{children}</main>;
};

export default MainContent;
