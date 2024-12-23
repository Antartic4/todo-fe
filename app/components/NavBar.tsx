import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="bg-[#0d0d0d] py-24">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
        {/* Rocket Image */}
        <Image
          src="/rocket-image.png"
          alt="Rocket Icon"
          width={22}
          height={36}
          priority
        />

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white">
          <span className="text-[#4ea8de]">Todo </span>
          <span className="text-[#5e60ce]">App</span>
        </h1>
      </div>
    </header>
  );
};

export default Navbar;
