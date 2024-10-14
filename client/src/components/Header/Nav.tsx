import NavLinks from "./NavLinks";

export default function Nav() {
  return (
    <nav className="w-full mb-[5vh]">
      <ol className="flex justify-around">
        <NavLinks />
      </ol>
    </nav>
  );
}
