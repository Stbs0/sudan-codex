
type Props = { children: React.ReactNode };

const MainContent = ({ children }: Props) => {
//  const {isMobile}=useWidth();
  return <main className='relative grid mx-auto py-8 '>{children}</main>;
};

export default MainContent;
