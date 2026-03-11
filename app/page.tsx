import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <h1>This is Home Page</h1>
        <Link className="btn px-4 py-2 bg-white text-black rounded-md font-bold" href={`/medicines`}>Medicines</Link>
      </main>
    </div>
  );
}
