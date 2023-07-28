import { tw } from 'twind';
import Navigation from '@/components/navigation';

interface IProps {
  children: React.ReactNode;
}

function Page({ children }: IProps) {
  return (
    <div>
      <div className={tw(`min-h-screen flex flex-col`)}>
        <Navigation />
        {children}
      </div>
    </div>
  );
}

export default Page;
