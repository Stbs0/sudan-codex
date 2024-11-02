import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main className='flex flex-col items-center text-center mt-16'>
      <h1 className='text-4xl font-bold mb-4'>The National Drug Database</h1>
      <p className='text-lg mb-8 max-w-md'>
        DrugWiki is a community driven database of medication information. Join
        us in our mission to improve the safety of drug use worldwide.
      </p>

      <Button className='bg-blue-600 hover:bg-blue-700 py-4 px-8 text-lg'>
        Join the community
      </Button>
    </main>
  );
};

export default Home;
